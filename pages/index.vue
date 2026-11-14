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
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/20 text-sm text-neutral-700 dark:text-white/80"
      >
        <span class="relative flex h-2 w-2">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-2 w-2 bg-green-500"
          ></span>
        </span>
        {{ $t("home.badge") }}
      </div>

      <!-- Main Heading -->
      <h1
        class="text-center text-4xl font-bold md:text-7xl lg:text-8xl text-neutral-900 dark:text-white max-w-5xl leading-tight"
      >
        {{ $t("home.titleLead") }}
        <span
          class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          {{ $t("home.titleAccent") }}
        </span>
      </h1>

      <!-- Subtitle -->
      <p
        class="text-center text-lg md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-2xl font-light"
      >
        {{ $t("home.subtitleLine1") }}
        <br class="hidden md:block" />
        {{ $t("home.subtitleLine2") }}
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <NuxtLink
          :to="localePath('/projects')"
          class="group relative px-8 py-3 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black font-medium hover:scale-105 transition-transform duration-200 shadow-lg shadow-black/20 dark:shadow-white/20"
        >
          {{ $t("common.viewWork") }}
          <span
            class="inline-block ms-2 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180"
            aria-hidden="true"
          >
            →
          </span>
        </NuxtLink>
        <NuxtLink
          :to="localePath('/contact')"
          class="px-8 py-3 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/20 text-neutral-800 dark:text-white font-medium hover:bg-black/10 dark:hover:bg-white/20 transition-colors duration-200"
        >
          {{ $t("common.getInTouch") }}
        </NuxtLink>
      </div>

      <!-- Tech Stack -->
      <div
        class="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-neutral-500 dark:text-white/50"
        :aria-label="$t('home.techStackLabel')"
      >
        <span class="flex items-center gap-2">
          <VueIcon class="w-5 h-5" />
          Vue.js
        </span>
        <span class="text-neutral-300 dark:text-white/30" aria-hidden="true">•</span>
        <span class="flex items-center gap-2">
          <NuxtIcon class="w-5 h-5" />
          Nuxt.js
        </span>
        <span class="text-neutral-300 dark:text-white/30" aria-hidden="true">•</span>
        <span class="flex items-center gap-2">
          <TypeScriptIcon class="w-5 h-5" />
          TypeScript
        </span>
        <span class="text-neutral-300 dark:text-white/30" aria-hidden="true">•</span>
        <span class="flex items-center gap-2">
          <TailwindIcon class="w-5 h-5" />
          Tailwind CSS
        </span>
        <span class="text-neutral-300 dark:text-white/30" aria-hidden="true">•</span>
        <span class="flex items-center gap-2">
          <ThreeIcon class="w-5 h-5" />
          Three.js
        </span>
        <span class="text-neutral-300 dark:text-white/30" aria-hidden="true">•</span>
        <span class="flex items-center gap-2">
          <GsapIcon class="w-5 h-5" />
          GSAP
        </span>
        <span class="text-neutral-300 dark:text-white/30" aria-hidden="true">•</span>
        <span class="flex items-center gap-2">
          <VuetifyIcon class="w-5 h-5" />
          Vuetify
        </span>
        <span class="text-neutral-300 dark:text-white/30" aria-hidden="true">•</span>
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

const { t } = useI18n();
const localePath = useLocalePath();

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

// Per-locale SEO (self canonical + reciprocal hreflang + og:locale) + ProfilePage.
useLocalizedSeo("home", {
  schema: ({ url, locale }) => ({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: t("home.metaTitle"),
    description: t("home.metaDescription"),
    url,
    inLanguage: locale,
    mainEntity: {
      "@type": "Person",
      "@id": "https://matinjahi.netlify.app/#person",
      name: "Matin Jahi",
      alternateName: "متین جاهی",
      jobTitle: t("site.role"),
      url: "https://matinjahi.netlify.app",
    },
  }),
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
