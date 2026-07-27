<template>
  <main class="relative min-h-screen py-20 md:py-24 px-4 sm:px-6" role="main">
    <!-- Background Grid -->
    <InteractiveGridPattern
      :class="'fixed inset-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]'"
      :width="100"
      :height="100"
      :squares="[30, 30]"
      squares-class-name="hover:fill-white-50"
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
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-neutral-700 dark:text-white/80"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2 w-2 bg-green-500"
              ></span>
            </span>
            Senior Frontend Developer
          </div>

          <h1
            class="text-4xl sm:text-5xl md:text-7xl font-bold text-black dark:text-white leading-tight text-balance px-4"
          >
            Engineering the web with
            <span
              class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              craft &amp; care
            </span>
          </h1>

          <p
            class="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed text-pretty px-4"
          >
            I&apos;m Matin Jahi, a frontend developer with 4+ years of
            experience building fast, scalable, SEO-optimized web applications
            with Vue.js, Nuxt.js, and TypeScript &mdash; with a strong focus on
            clean code, accessibility, and delightful motion.
          </p>
        </Motion>
      </header>

      <!-- Stats -->
      <section aria-label="Career statistics" class="mb-16 md:mb-24">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Motion
            v-for="(stat, index) in stats"
            :key="stat.label"
            :initial="isMounted ? { opacity: 0, y: 30 } : false"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: index * 0.1 }"
          >
            <div
              class="glassyCard group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center hover:bg-white/5 dark:hover:bg-white/1 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5 h-full"
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
      <section aria-label="Career journey" class="mb-16 md:mb-24">
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          class="text-center mb-10 md:mb-14"
        >
          <h2
            class="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-3 text-balance"
          >
            Career
            <span
              class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Journey
            </span>
          </h2>
          <p
            class="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-pretty"
          >
            From interactive 3D experiences to large-scale EdTech platforms
          </p>
        </Motion>

        <div class="relative">
          <!-- Timeline line -->
          <div
            class="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-pink-500/40 pointer-events-none"
            aria-hidden="true"
          ></div>

          <ol class="space-y-6 sm:space-y-8" role="list">
          <Motion
            v-for="(job, index) in experience"
            :key="job.company"
            as="li"
            :initial="isMounted ? { opacity: 0, x: -30 } : false"
            :while-in-view="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.5, delay: index * 0.1 }"
            class="relative pl-12 sm:pl-16"
          >
            <!-- Timeline dot -->
            <span
              class="absolute left-4 sm:left-6 top-8 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white/40"
              :style="{ background: job.gradient }"
              aria-hidden="true"
            ></span>

            <article
              class="glassyCard group relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:bg-white/5 dark:hover:bg-white/1 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5"
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
                  class="inline-flex self-start items-center px-3 py-1 rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-medium whitespace-nowrap"
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
                  class="tech-badge px-2.5 sm:px-3 py-1 rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-medium cursor-default"
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
      <section aria-label="Technical skills" class="mb-16 md:mb-24">
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          class="text-center mb-10 md:mb-14"
        >
          <h2
            class="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-3 text-balance"
          >
            Core
            <span
              class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Technologies
            </span>
          </h2>
          <p
            class="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-pretty"
          >
            The tools and disciplines I use to ship production-grade frontends
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
              class="glassyCard group relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:bg-white/5 dark:hover:bg-white/1 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5 h-full"
            >
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 outline "
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
                  class="tech-badge px-2.5 sm:px-3 py-1 rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-medium cursor-default"
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
      <section aria-label="Development philosophy" class="mb-16 md:mb-24">
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          class="text-center mb-10 md:mb-14"
        >
          <h2
            class="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-3 text-balance"
          >
            How I
            <span
              class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Work
            </span>
          </h2>
          <p
            class="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-pretty"
          >
            The principles behind every line of code I write
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
              class="glassyCard group relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:bg-white/5 dark:hover:bg-white/1 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5 h-full"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 outline"
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
      <section aria-label="Education" class="mb-16 md:mb-24">
        <Motion
          :initial="{ opacity: 0, y: 20 }"
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
              Education
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
              class="glassyCard group relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:bg-white/5 dark:hover:bg-white/1 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5 h-full"
            >
              <div class="flex items-start justify-between gap-3 mb-3">
                <h3
                  class="text-lg sm:text-xl font-bold text-black dark:text-white text-balance"
                >
                  {{ edu.degree }}
                </h3>
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-xs font-medium whitespace-nowrap"
                >
                  {{ edu.period }}
                </span>
              </div>
              <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-1">
                {{ edu.school }}
              </p>
              <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-500">
                {{ edu.location }} &middot; GPA {{ edu.gpa }}
              </p>
              <div
                class="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"
              ></div>
            </div>
          </Motion>
        </div>
      </section>

      <!-- CTA -->
      <section aria-label="Get in touch">
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
                Let&apos;s build something
                <span
                  class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  extraordinary
                </span>
              </h2>
              <p
                class="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto text-pretty"
              >
                Open to freelance projects, collaborations, and full-time
                opportunities. Let&apos;s talk about your next idea.
              </p>
              <div class="flex flex-col sm:flex-row items-center gap-4">
                <NuxtLink
                  to="/contact"
                  class="group px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:scale-105 transition-transform duration-200 shadow-lg shadow-black/20 dark:shadow-white/20"
                >
                  Get in Touch
                  <span
                    class="inline-block ml-2 group-hover:translate-x-1 transition-transform"
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
                    Download CV
                    <svg class="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </span>
                </a>
                <NuxtLink
                  to="/projects"
                  class="px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-black/20 dark:border-white/20 text-black dark:text-white font-medium hover:bg-white/20 transition-colors duration-200"
                >
                  View My Work
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
import { ref, onMounted } from "vue";

// Gate Motion initial state until after client mount to avoid
// "animate on null" hydration errors while keeping SSR content visible.
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

// SEO Configuration
const seoTitle = "About Matin Jahi — Senior Frontend Developer, Isfahan";
const seoDescription =
  "About Matin Jahi (متین جاهی) - Senior Frontend Developer with 4+ years of experience building fast, scalable, SEO-optimized web applications with Vue.js, Nuxt.js, and TypeScript. Learn about my career journey, skills, and development philosophy.";
const seoUrl = "https://matinjahi.netlify.app/about";
const seoImage = "https://matinjahi.netlify.app/og-image.jpg";

// Download Resume Function
const downloadResume = () => {
  const link = document.createElement('a');
  link.href = '/Matin-Jahi-Resume.pdf';
  link.download = 'Matin-Jahi-Resume.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

useHead({
  title: seoTitle,
  meta: [
    { name: "description", content: seoDescription },
    {
      name: "keywords",
      content:
        "About Matin Jahi, درباره متین جاهی, Senior Frontend Developer, Vue.js Developer, Nuxt.js Expert, frontend engineer experience, career journey, برنامه نویس فرانت اند",
    },
    { property: "og:type", content: "profile" },
    { property: "og:url", content: seoUrl },
    { property: "og:title", content: seoTitle },
    { property: "og:description", content: seoDescription },
    { property: "og:image", content: seoImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seoTitle },
    { name: "twitter:description", content: seoDescription },
    { name: "twitter:image", content: seoImage },
  ],
  link: [{ rel: "canonical", href: seoUrl }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: seoTitle,
        description: seoDescription,
        url: seoUrl,
        mainEntity: {
          "@type": "Person",
          name: "Matin Jahi",
          jobTitle: "Senior Frontend Developer",
          url: "https://matinjahi.netlify.app",
          sameAs: [
            "https://github.com/Matinj031",
            "https://linkedin.com/in/matin-jahi",
            "https://t.me/Ritalleral",
          ],
        },
      }),
    },
  ],
});

// Stats — sourced from resume
const stats = [
  {
    value: "4+",
    label: "Years of Experience",
    gradient: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
  },
  {
    value: "600K+",
    label: "Schools Served on Gamatrain",
    gradient: "linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)",
  },
  {
    value: "35%",
    label: "Faster Page Loads Delivered",
    gradient: "linear-gradient(135deg, #f472b6 0%, #fb7185 100%)",
  },
  {
    value: "40%",
    label: "Faster Feature Delivery",
    gradient: "linear-gradient(135deg, #38bdf8 0%, #60a5fa 100%)",
  },
];

// Experience — sourced from resume
const experience = [
  {
    role: "Frontend Developer (Open Source Contributor)",
    company: "GamaEdtech (Gamatrain)",
    location: "Remote",
    period: "Apr 2025 – Present",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    highlights: [
      "Architected scalable features for an open-source Nuxt.js 4 / Vue.js 3 EdTech platform serving 600,000+ registered schools",
      "Designed an AI-assisted quiz builder and school finder, driving a 25% increase in user session duration",
      "Integrated Three.js-powered interactive educational content, contributing to a 15% increase in user retention",
      "Redesigned routing architecture across 15+ core pages, cutting page load times by 35% and improving Core Web Vitals",
    ],
    tech: ["Nuxt 4", "Vue 3", "TypeScript", "Three.js", "Accessibility"],
  },
  {
    role: "Senior Frontend Developer",
    company: "IraniCard (Pateh)",
    location: "Isfahan, Iran",
    period: "May 2024 – Jan 2025",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    highlights: [
      "Led end-to-end frontend architecture for a leading travel platform, launching 7 core homepage sections in 8 months",
      "Built a reusable Vue.js 3 component library in a microservices environment, accelerating feature delivery by 40%",
      "Introduced RxJS for async data flow, reducing race-condition bugs by 65% in real-time search features",
    ],
    tech: ["Vue 3", "RxJS", "Component Library", "Microservices", "Agile"],
  },
  {
    role: "Frontend Developer",
    company: "Eron",
    location: "Tehran, Iran",
    period: "Apr 2021 – Apr 2023",
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    highlights: [
      "Created an interactive 3D product visualization feature with Three.js and Blender, boosting engagement by 30%",
      "Built GSAP-driven scroll-triggered animation systems, improving perceived performance and Core Web Vitals by 20%",
      "Owned a shared Vue.js component library applying WCAG 2.1 standards and SOLID principles",
    ],
    tech: ["Vue.js", "Three.js", "GSAP", "Blender", "WCAG 2.1"],
  },
];

// Skill groups — sourced from resume
const skillGroups = [
  {
    title: "Frameworks & Languages",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
    skills: [
      "Vue.js 2/3",
      "Nuxt.js 2/3/4",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES2022+)",
      "Quasar",
    ],
  },
  {
    title: "Styling & UI Systems",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>',
    skills: [
      "Tailwind CSS",
      "SCSS/Sass",
      "Vuetify",
      "Material Design 3",
      "Figma",
      "WCAG 2.1",
      "Semantic HTML",
    ],
  },
  {
    title: "State, Data & Architecture",
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/></svg>',
    skills: [
      "Pinia",
      "Vuex",
      "VueUse",
      "RxJS",
      "REST APIs",
      "SOLID Principles",
      "Design Patterns",
    ],
  },
  {
    title: "Motion, 3D & Tooling",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
    skills: [
      "Three.js",
      "GSAP",
      "Blender",
      "Vite.js",
      "Vitest",
      "Cypress",
      "Docker",
      "CI/CD",
    ],
  },
];

// Philosophy — grounded in resume themes
const philosophy = [
  {
    title: "Clean, Maintainable Code",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
    description:
      "SOLID principles, rigorous code review ownership, and enforced quality standards. Code should read like it was written by one careful person.",
  },
  {
    title: "Performance First",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
    description:
      "Core Web Vitals are a feature, not an afterthought. From routing architecture to animation budgets, every decision is measured against real user experience.",
  },
  {
    title: "Accessible by Default",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
    description:
      "WCAG 2.1 standards, semantic HTML, and Section 508-compliant navigation patterns. The web works best when it works for everyone.",
  },
  {
    title: "Motion with Purpose",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4"/></svg>',
    description:
      "GSAP timelines, Three.js scenes, and micro-interactions that improve perceived performance — elegant, restrained, and always at 60 FPS.",
  },
  {
    title: "Reusable Systems",
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/></svg>',
    description:
      "Component libraries that accelerate whole teams. Build it once, build it right, and cut cross-team integration time in half.",
  },
  {
    title: "Collaboration & Ownership",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
    description:
      "Cross-functional work with product, backend, QA, and stakeholders in Agile cycles — championing standards that keep five teams shipping without conflicts.",
  },
];

// Education — sourced from resume
const education = [
  {
    degree: "B.Sc. Computer Engineering — Software",
    school: "Shahid Mohsen Mohajer Technical and Vocational University",
    location: "Isfahan, Iran",
    period: "2023 – 2027 (Expected)",
    gpa: "18/20",
  },
  {
    degree: "A.Sc. Information Technology",
    school: "Shahid Shamsipour Technical and Vocational University",
    location: "Tehran, Iran",
    period: "2021 – 2023",
    gpa: "18/20",
  },
];
</script>

<style scoped>
/* Glassy Card Effect — consistent with projects page */
.glassyCard {
  background: rgba(255, 255, 255, 0);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.082);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.158);
}

/* Tech Badge Animations — consistent with projects page */
.tech-badge {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
  background: rgba(255, 255, 255, 0.5);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.dark .tech-badge:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
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
