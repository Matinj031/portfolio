<template>
  <AuroraBackground>
      <Motion
        as="div"
        :initial="isMounted ? { opacity: 0, y: 40, filter: 'blur(10px)' } : false"
        :animate="{
          opacity: 1,
          y: 0,
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
          to="/projects"
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
          <VueIcon class="w-5 h-5" />
          Vue.js
        </span>
        <span class="text-white/30">•</span>
        <span class="flex items-center gap-2">
          <NuxtIcon class="w-5 h-5" />
          Nuxt.js
        </span>
        <span class="text-white/30">•</span>
        <span class="flex items-center gap-2">
          <TypeScriptIcon class="w-5 h-5" />
          TypeScript
        </span>
        <span class="text-white/30">•</span>
        <span class="flex items-center gap-2">
          <TailwindIcon class="w-5 h-5" />
          Tailwind CSS
        </span>
        <span class="text-white/30">•</span>
        <span class="flex items-center gap-2">
          <ThreeIcon class="w-5 h-5" />
          Three.js
        </span>
        <span class="text-white/30">•</span>
        <span class="flex items-center gap-2">
          <GsapIcon class="w-5 h-5" />
          GSAP
        </span>
        <span class="text-white/30">•</span>
        <span class="flex items-center gap-2">
          <VuetifyIcon class="w-5 h-5" />
          Vuetify
        </span>
        <span class="text-white/30">•</span>
        <span class="flex items-center gap-2">
          <SwiperJsIcon class="w-5 h-5" />
          SwiperJs
        </span>
      </div>
      </Motion>
  </AuroraBackground>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import VueIcon from "~/components/icons/VueIcon.vue";
import NuxtIcon from "~/components/icons/NuxtIcon.vue";

import TypeScriptIcon from "~/components/icons/TypeScriptIcon.vue";
import TailwindIcon from "~/components/icons/TailwindIcon.vue";
import ThreeIcon from "~/components/icons/ThreeIcon.vue";
import GsapIcon from "~/components/icons/GsapIcon.vue";
import VuetifyIcon from "~/components/icons/Vuetify.vue";
import SwiperJsIcon from "~/components/icons/SwiperJsIcon.vue";

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

useHead({

  title: "Matin Jahi — Frontend Developer (Vue.js & Nuxt.js)",
  meta: [
    {
      name: "description",
      content:
        "Matin Jahi (متین جاهی) - Frontend Developer Portfolio. Specialized in Vue.js, Nuxt.js, React, TypeScript. Building modern, performant, and accessible web applications. Isfahan, Iran.",
    },
    {
      name: "keywords",
      content:
        "Matin Jahi, متین جاهی, Frontend Developer Portfolio, Vue.js Developer, Nuxt.js Expert, React Developer, Web Developer Isfahan, برنامه نویس فرانت اند اصفهان",
    },
  ],
  link: [{ rel: "canonical", href: "https://matinjahi.netlify.app/" }],
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
