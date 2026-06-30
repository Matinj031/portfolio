<template>
  <svg :width="String(gridWidth)" :height="String(gridHeight)" :class="svgClass">
    <rect
      v-for="square in squaresData"
      :key="square.index"
      :x="square.x"
      :y="square.y"
      :width="square.w"
      :height="square.h"
      :class="getRectClass(square.index)"
      @mouseenter="handleMouseEnter(square.index)"
      @mouseleave="handleMouseLeave"
    />
  </svg>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { ref, computed, type HTMLAttributes } from "vue";

interface InteractiveGridPatternProps {
  className?: HTMLAttributes["class"];
  squaresClassName?: HTMLAttributes["class"];
  width?: number;
  height?: number;
  squares?: [number, number];
}

const props = withDefaults(defineProps<InteractiveGridPatternProps>(), {
  width: 40,
  height: 40,
  squares: () => [24, 24],
});

const horizontal = computed(() => props.squares[0]);
const vertical = computed(() => props.squares[1]);

const hoveredSquare = ref<number | null>(null);

const gridWidth = computed(() => props.width * horizontal.value);
const gridHeight = computed(() => props.height * vertical.value);

// Pre-compute all square data as strings to avoid DOM property issues
const squaresData = computed(() => {
  const total = horizontal.value * vertical.value;
  const data = [];
  for (let i = 0; i < total; i++) {
    data.push({
      index: i,
      x: String((i % horizontal.value) * props.width),
      y: String(Math.floor(i / horizontal.value) * props.height),
      w: String(props.width),
      h: String(props.height),
    });
  }
  return data;
});

const svgClass = computed(() =>
  cn(
    "absolute inset-0 h-full w-full border border-gray-400/30",
    props.className
  )
);

function getRectClass(index: number) {
  return cn(
    "stroke-gray-400/30 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000",
    hoveredSquare.value === index ? "fill-gray-300/30" : "fill-transparent",
    props.squaresClassName
  );
}

function handleMouseEnter(index: number) {
  hoveredSquare.value = index;
}

function handleMouseLeave() {
  hoveredSquare.value = null;
}
</script>
