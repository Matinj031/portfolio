<template>
  <div
    :class="[
      containerClassName,
    ]"
  >
    <canvas
      ref="canvasRef"
      class="absolute inset-0 z-0 "
      :style="isSafari ? { filter: `blur(${blur}px)` } : {}"
    ></canvas>
    <div :class="['relative z-10', className]" v-bind="$attrs">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { createNoise3D } from "simplex-noise";



// Props
const props = defineProps({
  className: String,
  containerClassName: String,
  colors: {
    type: Array,
    default: () => ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"],
  },
  waveWidth: Number,
  backgroundFill: {
    type: String,
  },
  blur: {
    type: Number,
    default: 7,
  },
  speed: {
    type: String,
    default: "fast",
  },
  waveOpacity: {
    type: Number,
    default: 0.5,
  },
});

// Refs
const canvasRef = ref(null);
const isSafari = ref(false);

// Noise and animation
const noise = createNoise3D();
let w, h, nt, i, x, ctx, canvas;
let animationId;

// Speed calculation
const getSpeed = () => {
  switch (props.speed) {
    case "slow":
      return 0.001;
    case "fast":
      return 0.0015;
    default:
      return 0.001;
  }
};

// Initialize canvas
const init = () => {
  canvas = canvasRef.value;
  ctx = canvas.getContext("2d");
  w = ctx.canvas.width = window.innerWidth;
  h = ctx.canvas.height = window.innerHeight;
  ctx.filter = `blur(${props.blur}px)`;
  nt = 0;

  window.onresize = () => {
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${props.blur}px)`;
  };

  render();
};

// Draw wave
const drawWave = (n) => {
  nt += getSpeed();
  for (i = 0; i < n; i++) {
    ctx.beginPath();
    ctx.lineWidth = props.waveWidth || 30;
    ctx.strokeStyle = props.colors[i % props.colors.length];
    for (x = 0; x < w; x += 5) {
      const y = noise(x / 800, 0.3 * i, nt) * 100;
      ctx.lineTo(x, y + h * 0.1111); // Adjust for height
    }
    ctx.stroke();
    ctx.closePath();
  }
};

// Render loop
const render = () => {
  ctx.fillStyle = props.backgroundFill;
  ctx.globalAlpha = props.waveOpacity;
  ctx.fillRect(0, 0, w, h);
  drawWave(4);
  animationId = requestAnimationFrame(render);
};

// Mount and unmount
onMounted(() => {
  init();``
  isSafari.value =
    typeof window !== "undefined" &&
    navigator.userAgent.includes("Safari") &&
    !navigator.userAgent.includes("Chrome");
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
});
</script>

<style scoped>
body{
  background: #818df815;
}
/* Add any custom styles here */
</style>
