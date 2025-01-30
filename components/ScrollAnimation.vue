<template>
  <div ref="box" class="box"></div>
</template>

<script setup>
const box = ref(null);

onMounted(() => {
  gsap.to(box.value, {
    x: 300,
    rotation: 360,
    scrollTrigger: {
      trigger: box.value, // Element to trigger the animation
      start: "top center", // When the top of the element hits the center of the viewport
      end: "bottom center", // When the bottom of the element hits the center of the viewport
      scrub: true, // Smoothly scrub through the animation on scroll
    },
  });
});
</script>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: #38bdf8;
  margin: 500px 0; /* Add some space to scroll */
}
</style>