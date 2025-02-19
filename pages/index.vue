<template>
  <div class="relative">
    <MorphParticles />
    <!-- Hero Section -->
    <section data-section class="min-h-screen flex items-center justify-center bg-black">
      <div class="text-center text-white">
        <h1 class="text-6xl font-bold mb-4">Welcome</h1>
        <p class="text-xl">Scroll to explore</p>
      </div>
    </section>

    <!-- Crystal Section -->
    <section data-section class="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-purple-900">
      <div class="text-center text-white">
        <h2 class="text-5xl font-bold mb-4">Crystal Magic</h2>
        <p class="text-xl">Discover the beauty of crystalline forms</p>
      </div>
    </section>

    <!-- Tree Section -->
    <section data-section class="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-green-900">
      <div class="text-center text-white">
        <h2 class="text-5xl font-bold mb-4">Nature's Wisdom</h2>
        <p class="text-xl">Experience the growth of life</p>
      </div>
    </section>

    <!-- Oni Section -->
    <section data-section class="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-900 to-red-900">
      <div class="text-center text-white">
        <h2 class="text-5xl font-bold mb-4">Mythical Beings</h2>
        <p class="text-xl">Enter the realm of legends</p>
      </div>
    </section>

    <!-- Horse Section -->
    <section data-section class="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-900 to-blue-900">
      <div class="text-center text-white">
        <h2 class="text-5xl font-bold mb-4">Wild Spirit</h2>
        <p class="text-xl">Feel the power of freedom</p>
      </div>
    </section>

    <!-- Boy Section -->
    <section data-section class="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-black">
      <div class="text-center text-white">
        <h2 class="text-5xl font-bold mb-4">Human Journey</h2>
        <p class="text-xl">The story of us</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Morphing Gallery',
})
</script>

<style scoped>
section {
  position: relative;
  z-index: 1;
  transition: background-color 0.5s ease;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Hide scrollbar but keep functionality */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
</style>