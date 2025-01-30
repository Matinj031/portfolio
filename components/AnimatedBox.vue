<template>
  <div ref="box" class="box"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const box = ref(null);

onMounted(() => {
  // Use GSAP to animate the box
  gsap.to(box.value, {
    x: 300, // Move 300px to the right
    rotation: 360, // Rotate 360 degrees
    duration: 2, // Animation duration in seconds
    repeat: -1, // Repeat indefinitely
    yoyo: true, // Reverse the animation on each repeat
  });
});
</script>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: #38bdf8;
}
</style>
