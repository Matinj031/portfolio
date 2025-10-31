<template>
  <AuroraBackground>
    <Motion
      as="div"
      :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
      :while-in-view="{
        opacity: 1,
        y: 1,
        filter: 'blur(0px)',
      }"
      :transition="{
        delay: 0.3,
        duration: 0.8,
        ease: 'easeInOut',
      }"
      class="relative flex flex-col items-center justify-center gap-6 px-4"
    >
      <!-- Greeting Badge -->
      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-white/80"
      >
        <span class="relative flex h-2 w-2">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-2 w-2 bg-green-500"
          ></span>
        </span>
        Available for work
      </div>

      <!-- Main Heading -->
      <h1
        class="text-center text-4xl font-bold md:text-7xl lg:text-8xl dark:text-white max-w-5xl leading-tight"
      >
        Crafting beautiful
        <span
          class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          web experiences
        </span>
      </h1>

      <!-- Subtitle -->
      <p
        class="text-center text-lg md:text-2xl text-white/70 dark:text-neutral-300 max-w-2xl font-light"
      >
        Frontend Developer specializing in Vue.js & Nuxt.js
        <br class="hidden md:block" />
        Building modern, performant, and accessible applications
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <NuxtLink
          to="/apps"
          class="group relative px-8 py-3 rounded-full bg-white text-black font-medium hover:scale-105 transition-transform duration-200 shadow-lg shadow-white/20"
        >
          View My Work
          <span
            class="inline-block ml-2 group-hover:translate-x-1 transition-transform"
          >
            →
          </span>
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-colors duration-200"
        >
          Get in Touch
        </NuxtLink>
      </div>

      <!-- Tech Stack -->
      <div
        class="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-white/50"
      >
        <span class="flex items-center gap-2">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          Vue.js
        </span>
        <span class="text-white/30">•</span>
        <span class="flex items-center gap-2">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          Nuxt.js
        </span>
        <span class="text-white/30">•</span>
        <span>TypeScript</span>
        <span class="text-white/30">•</span>
        <span>Tailwind CSS</span>
        <span class="text-white/30">•</span>
        <span>GSAP</span>
      </div>
    </Motion>
  </AuroraBackground>
</template>

<script setup lang="ts">
useHead({
  title: "Matin Jahi - Frontend Developer",
  meta: [
    {
      name: "description",
      content:
        "Frontend Developer specializing in Vue.js and Nuxt.js. Building modern, performant, and accessible web applications.",
    },
  ],
});
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
