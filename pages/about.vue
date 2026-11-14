<template>
  <main class="relative min-h-screen py-20 md:py-24 px-4 sm:px-6" role="main">
    <!-- Background Grid -->
    <InteractiveGridPattern
      :class="'fixed inset-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]'"
      :width="100"
      :height="100"
      :squares="[30, 30]"
      squares-class-name="hover:fill-foreground/10"
    />

    <div class="relative z-10 max-w-6xl mx-auto">
        <!-- Hero -->
      <header>
        <Motion
          :initial="isMounted ? { opacity: 0, y: 40, filter: 'blur(10px)' } : false"
          :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
          :transition="{ duration: 0.8, ease: 'easeInOut' }"
          class="text-center mb-16 md:mb-24 flex flex-col items-center gap-6"
        >
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
            {{ $t("about.badge") }}
          </div>

          <h1
            class="text-4xl sm:text-5xl md:text-7xl font-bold text-black dark:text-white leading-tight text-balance px-4"
          >
            {{ $t("about.titleLead") }}
            <span
              class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {{ $t("about.titleAccent") }}
            </span>
          </h1>

          <p
            class="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed text-pretty px-4"
          >
            {{ $t("about.intro") }}
          </p>
        </Motion>
      </header>

      <!-- Stats -->
      <section :aria-label="$t('about.sections.statistics')" class="mb-16 md:mb-24">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Motion
            v-for="(stat, index) in stats"
            :key="stat.label"
            :initial="isMounted ? { opacity: 0, y: 30 } : false"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: index * 0.1 }"
          >
            <div
              class="glassyCard group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/10 dark:hover:border-white/20 transition-colors duration-300 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5 h-full"
            >
              <p
                class="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r bg-clip-text text-transparent mb-2"
                :style="{ backgroundImage: stat.gradient }"
              >
                {{ stat.value }}
              </p>
              <p
                class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium"
              >
                {{ stat.label }}
              </p>
              <div
                class="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"
              ></div>
            </div>
          </Motion>
        </div>
      </section>

      <!-- Career Journey / Timeline -->
      <section :aria-label="$t('about.sections.career')" class="mb-16 md:mb-24">
        <Motion
          :initial="isMounted ? { opacity: 0, y: 20 } : false"

          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          class="text-center mb-10 md:mb-14"
        >
          <h2
            class="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-3 text-balance"
          >
            {{ $t("about.careerTitleLead") }}
            <span
              class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {{ $t("about.careerTitleAccent") }}
            </span>
          </h2>
          <p
            class="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-pretty"
          >
            {{ $t("about.careerSubtitle") }}
          </p>
        </Motion>

        <div class="relative">
          <!-- Timeline line -->
          <div
            class="absolute start-4 sm:start-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-pink-500/40 pointer-events-none"
            aria-hidden="true"
          ></div>

          <ol class="space-y-6 sm:space-y-8" role="list">
          <Motion
            v-for="(job, index) in experience"
            :key="job.company"
            as="li"
            :initial="isMounted ? { opacity: 0, x: slideX } : false"
            :while-in-view="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.5, delay: index * 0.1 }"
            class="relative ps-12 sm:ps-16"
          >
            <!-- Timeline dot -->
            <span
              class="absolute start-4 sm:start-6 top-8 -translate-x-1/2 rtl:translate-x-1/2 w-3 h-3 rounded-full border-2 border-black/15 dark:border-white/40"
              :style="{ background: job.gradient }"
              aria-hidden="true"
            ></span>

            <article
              class="glassyCard group relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/10 dark:hover:border-white/20 transition-colors duration-300 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5"
            >
              <div
                class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4"
              >
                <div class="flex-1 min-w-0">
                  <h3
                    class="text-xl sm:text-2xl font-bold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                  >
                    {{ job.role }}
                  </h3>
                  <p
                    class="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1"
                  >
                    {{ job.company }} &middot; {{ job.location }}
                  </p>
                </div>
                <span
                  class="inline-flex self-start items-center px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-medium whitespace-nowrap"
                >
                  {{ job.period }}
                </span>
              </div>

              <ul
                class="space-y-2 mb-5 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed list-disc list-inside marker:text-purple-400"
              >
                <li v-for="highlight in job.highlights" :key="highlight">
                  {{ highlight }}
                </li>
              </ul>

              <div class="flex flex-wrap gap-1.5 sm:gap-2">
                <span
                  v-for="tech in job.tech"
                  :key="tech"
                  class="tech-badge px-2.5 sm:px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-medium cursor-default"
                >
                  {{ tech }}
                </span>
              </div>

              <div
                class="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"
              ></div>
            </article>
          </Motion>
          </ol>
        </div>
      </section>

      <!-- Skills -->
      <section :aria-label="$t('about.sections.skills')" class="mb-16 md:mb-24">
        <Motion
          :initial="isMounted ? { opacity: 0, y: 20 } : false"

          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          class="text-center mb-10 md:mb-14"
        >
          <h2
            class="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-3 text-balance"
          >
            {{ $t("about.skillsTitleLead") }}
            <span
              class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {{ $t("about.skillsTitleAccent") }}
            </span>
          </h2>
          <p
            class="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-pretty"
          >
            {{ $t("about.skillsSubtitle") }}
          </p>
        </Motion>

        <div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <Motion
            v-for="(group, index) in skillGroups"
            :key="group.title"
            :initial="isMounted ? { opacity: 0, y: 30 } : false"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: index * 0.1 }"
          >
            <div
              class="glassyCard group relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/10 dark:hover:border-white/20 transition-colors duration-300 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5 h-full"
            >
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center text-neutral-900 dark:text-white flex-shrink-0 outline "
                >
                  <div v-html="group.icon" class="w-5 h-5"></div>
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-black dark:text-white">
                  {{ group.title }}
                </h3>
              </div>
              <div class="flex flex-wrap gap-1.5 sm:gap-2">
                <span
                  v-for="skill in group.skills"
                  :key="skill"
                  class="tech-badge px-2.5 sm:px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-medium cursor-default"
                >
                  {{ skill }}
                </span>
              </div>
              <div
                class="absolute inset-0 rounded-2xl sm:rounded-3xl bg-linear-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"
              ></div>
            </div>
          </Motion>
        </div>
      </section>

      <!-- Philosophy -->
      <section :aria-label="$t('about.sections.philosophy')" class="mb-16 md:mb-24">
        <Motion
          :initial="isMounted ? { opacity: 0, y: 20 } : false"

          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          class="text-center mb-10 md:mb-14"
        >
          <h2
            class="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-3 text-balance"
          >
            {{ $t("about.philosophyTitleLead") }}
            <span
              class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {{ $t("about.philosophyTitleAccent") }}
            </span>
          </h2>
          <p
            class="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-pretty"
          >
            {{ $t("about.philosophySubtitle") }}
          </p>
        </Motion>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Motion
            v-for="(value, index) in philosophy"
            :key="value.title"
            :initial="isMounted ? { opacity: 0, y: 30 } : false"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: index * 0.1 }"
          >
            <div
              class="glassyCard group relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/10 dark:hover:border-white/20 transition-colors duration-300 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5 h-full"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center text-neutral-900 dark:text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 outline"
              >
                <div v-html="value.icon" class="w-5 h-5"></div>
              </div>
              <h3
                class="text-lg sm:text-xl font-bold text-black dark:text-white mb-2"
              >
                {{ value.title }}
              </h3>
              <p
                class="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed"
              >
                {{ value.description }}
              </p>
              <div
                class="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"
              ></div>
            </div>
          </Motion>
        </div>
      </section>

      <!-- Education -->
      <section :aria-label="$t('about.sections.education')" class="mb-16 md:mb-24">
        <Motion
          :initial="isMounted ? { opacity: 0, y: 20 } : false"

          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          class="text-center mb-10 md:mb-14"
        >
          <h2
            class="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-3 text-balance"
          >
            <span
              class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {{ $t("about.educationTitle") }}
            </span>
          </h2>
        </Motion>

        <div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <Motion
            v-for="(edu, index) in education"
            :key="edu.school"
            :initial="isMounted ? { opacity: 0, y: 30 } : false"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: index * 0.1 }"
          >
            <div
              class="glassyCard group relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/10 dark:hover:border-white/20 transition-colors duration-300 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5 h-full"
            >
              <div class="flex items-start justify-between gap-3 mb-3">
                <h3
                  class="text-lg sm:text-xl font-bold text-black dark:text-white text-balance"
                >
                  {{ edu.degree }}
                </h3>
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-xs font-medium whitespace-nowrap"
                >
                  {{ edu.period }}
                </span>
              </div>
              <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-1">
                {{ edu.school }}
              </p>
              <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-500">
                {{ edu.location }} &middot; {{ $t("about.gpaLabel") }} {{ edu.gpa }}
              </p>
              <div
                class="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"
              ></div>
            </div>
          </Motion>
        </div>
      </section>

      <!-- CTA -->
      <section :aria-label="$t('about.sections.contact')">
        <Motion
          :initial="isMounted ? { opacity: 0, y: 30, filter: 'blur(6px)' } : false"
          :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
          :transition="{ duration: 0.7, ease: 'easeInOut' }"
        >
          <div
            class="glassyCard relative p-8 sm:p-12 md:p-16 rounded-2xl sm:rounded-3xl text-center overflow-hidden"
          >
            <div
              class="absolute -inset-1 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-2xl pointer-events-none"
              aria-hidden="true"
            ></div>
            <div class="relative flex flex-col items-center gap-6">
              <h2
                class="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white text-balance"
              >
                {{ $t("about.ctaTitleLead") }}
                <span
                  class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  {{ $t("about.ctaTitleAccent") }}
                </span>
              </h2>
              <p
                class="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto text-pretty"
              >
                {{ $t("about.ctaText") }}
              </p>
              <div class="flex flex-col sm:flex-row items-center gap-4">
                <NuxtLink
                  :to="localePath('/contact')"
                  class="group px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:scale-105 transition-transform duration-200 shadow-lg shadow-black/20 dark:shadow-white/20"
                >
                  {{ $t("common.getInTouch") }}
                  <span
                    class="inline-block ms-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </NuxtLink>
                <a
                  href="/Matin-Jahi-Resume.pdf"
                  download="Matin-Jahi-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:scale-105 transition-transform duration-200 shadow-lg shadow-blue-500/30"
                  @click.prevent="downloadResume"
                >
                  <span class="inline-flex items-center gap-2">
                    {{ $t("common.downloadCv") }}
                    <svg class="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </span>
                </a>
                <NuxtLink
                  :to="localePath('/projects')"
                  class="px-8 py-3 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/20 text-black dark:text-white font-medium hover:bg-black/10 dark:hover:bg-white/20 transition-colors duration-200"
                >
                  {{ $t("common.viewWork") }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </Motion>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

const { t, te, locale, locales } = useI18n();

// `tm()` returns compiled message AST descriptors (not strings), so nested
// arrays/objects must be resolved field-by-field with `t()` to get plain text.
const readStringArray = (base: string): string[] => {
  const arr: string[] = [];
  let i = 0;
  while (te(`${base}.${i}`)) {
    arr.push(String(t(`${base}.${i}`)));
    i++;
  }
  return arr;
};
const localePath = useLocalePath();

// Gate Motion initial state until after client mount to avoid
// "animate on null" hydration errors while keeping SSR content visible.
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

// Direction-aware entrance animation (timeline slides from the inline start).
const isRtl = computed(
  () =>
    (locales.value as Array<{ code: string; dir?: string }>).find(
      (l) => l.code === locale.value,
    )?.dir === "rtl",
);
const slideX = computed(() => (isRtl.value ? 30 : -30));

// --- Language-neutral decoration (gradients / icons) kept in code -----------
const statGradients = [
  "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
  "linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)",
  "linear-gradient(135deg, #f472b6 0%, #fb7185 100%)",
  "linear-gradient(135deg, #38bdf8 0%, #60a5fa 100%)",
];

const experienceGradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
  "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
];

const skillGroupMeta = [
  {
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
  },
  {
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>',
  },
  {
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/></svg>',
  },
  {
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
  },
];

const philosophyMeta = [
  {
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
  },
  {
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
  },
  {
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
  },
  {
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4"/></svg>',
  },
  {
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/></svg>',
  },
  {
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
  },
];

// --- Localized content merged with the decoration above ---------------------
// `tm()` returns compiled message AST descriptors (not strings), so each field
// is resolved individually with `t()` and string arrays with `readStringArray()`.
const stats = computed(() =>
  statGradients.map((gradient, i) => ({
    value: String(t(`about.stats.${i}.value`)),
    label: String(t(`about.stats.${i}.label`)),
    gradient,
  })),
);

const experience = computed(() =>
  experienceGradients.map((gradient, i) => ({
    role: String(t(`about.experience.${i}.role`)),
    company: String(t(`about.experience.${i}.company`)),
    location: String(t(`about.experience.${i}.location`)),
    period: String(t(`about.experience.${i}.period`)),
    highlights: readStringArray(`about.experience.${i}.highlights`),
    tech: readStringArray(`about.experience.${i}.tech`),
    gradient,
  })),
);

const skillGroups = computed(() =>
  skillGroupMeta.map((meta, i) => ({
    title: String(t(`about.skillGroups.${i}.title`)),
    skills: readStringArray(`about.skillGroups.${i}.skills`),
    ...meta,
  })),
);

const philosophy = computed(() =>
  philosophyMeta.map((meta, i) => ({
    title: String(t(`about.philosophy.${i}.title`)),
    description: String(t(`about.philosophy.${i}.description`)),
    ...meta,
  })),
);

const education = computed(() =>
  [0, 1].map((i) => ({
    degree: String(t(`about.education.${i}.degree`)),
    school: String(t(`about.education.${i}.school`)),
    location: String(t(`about.education.${i}.location`)),
    period: String(t(`about.education.${i}.period`)),
    gpa: String(t(`about.education.${i}.gpa`)),
  })),
);

// SEO — self canonical + reciprocal hreflang + og:locale + AboutPage schema.
useLocalizedSeo("about", {
  ogType: "profile",
  schema: ({ url, locale: pageLocale }) => ({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("about.metaTitle"),
    description: t("about.metaDescription"),
    url,
    inLanguage: pageLocale,
    mainEntity: {
      "@type": "Person",
      "@id": "https://matinjahi.netlify.app/#person",
      name: "Matin Jahi",
      alternateName: "متین جاهی",
      jobTitle: t("site.role"),
      url: "https://matinjahi.netlify.app",
      sameAs: [
        "https://github.com/Matinj031",
        "https://linkedin.com/in/matin-jahi",
        "https://t.me/Ritalleral",
      ],
    },
  }),
});

// Download Resume Function
const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/Matin-Jahi-Resume.pdf";
  link.download = "Matin-Jahi-Resume.pdf";
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style scoped>
/* Glassy Card Effect — consistent with projects page */
.glassyCard {
  background: var(--glass-bg);
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid var(--glass-border);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

/* Tech Badge Animations — consistent with projects page */
.tech-badge {
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tech-badge::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.tech-badge:hover {
  transform: translateY(-2px) scale(1.05);
  background: var(--accent-hover);
  border-color: var(--border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.tech-badge:hover::before {
  width: 200px;
  height: 200px;
}

.tech-badge:active {
  transform: translateY(0) scale(0.98);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .tech-badge,
  .glassyCard,
  .group * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
