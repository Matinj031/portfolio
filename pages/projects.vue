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

    <!-- Loading State -->
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm"
    >
      <div class="text-center">
        <div
          class="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"
        ></div>
        <p class="text-lg font-medium text-black dark:text-white">
          Loading projects...
        </p>
        <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
          {{ loadingProgress }}
        </p>
      </div>
    </div>

    <!-- Content -->
    <div v-if="!isLoading" class="relative z-10 max-w-6xl mx-auto">
      <ClientOnly>
      <!-- Header -->
      <header>
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          class="text-center mb-12 md:mb-16"
        >
          <h1
            class="text-4xl sm:text-5xl md:text-7xl font-bold text-black dark:text-white mb-3 md:mb-4 px-4"
          >
            Recent Projects
          </h1>
          <p
            class="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-4"
          >
            A collection of my latest work and contributions in web development
          </p>
        </Motion>
      </header>

      <!-- Projects Grid -->
      <section
        aria-label="Projects showcase"
        class="grid gap-4 sm:gap-6 md:gap-8"
      >
        <Motion
          v-for="(project, index) in projects"
          :key="project.id"
          :initial="{ opacity: 0, y: 30 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: index * 0.1 }"
          class="group relative"
        >
          <article
            class="glassyCard relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:bg-white/5 dark:hover:bg-white/1 hover:border-white/20 dark:hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5"
            itemscope
            itemtype="https://schema.org/CreativeWork"
          >
            <!-- Project Header -->
            <div class="space-y-4 mb-4">
              <!-- Title and Icon -->
              <div class="flex items-start gap-3">
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0"
                  :style="{ background: project.gradient }"
                >
                  {{ project.icon }}
                </div>
                <div class="flex-1 min-w-0">
                  <linkPreview
                    v-if="project.demo"
                    :url="project.demo"
                    :width="500"
                    :height="300"
                  >
                    <h3
                      class="text-xl sm:text-2xl font-bold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer break-words"
                    >
                      {{ project.title }}
                    </h3>
                  </linkPreview>
                  <h3
                    v-else
                    class="text-xl sm:text-2xl font-bold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-words"
                  >
                    {{ project.title }}
                  </h3>
                  <p
                    class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1"
                  >
                    {{ project.year }}
                  </p>
                </div>
              </div>

              <!-- Links -->
              <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
                <linkPreview
                  v-if="project.demo"
                  :url="project.demo"
                  :width="400"
                  :height="250"
                  class="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs sm:text-sm font-medium hover:scale-105 transition-transform"
                >
                  <svg
                    class="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Live Demo
                </linkPreview>
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  class="p-1.5 sm:p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
                  aria-label="GitHub"
                >
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <!-- Description -->
            <p
              class="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed"
              itemprop="description"
            >
              {{ project.description }}
            </p>

            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-1.5 sm:gap-2" itemprop="keywords">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="tech-badge px-2.5 sm:px-3 py-1 rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-medium cursor-default"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Hover Effect -->
            <div
              class="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"
            ></div>

            <!-- Hidden metadata for SEO -->
            <meta itemprop="url" :content="project.demo || project.github" />
            <meta itemprop="author" content="Matin Jahi" />
          </article>
        </Motion>
      </section>
      </ClientOnly>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

// Projects data - defined first for use in SEO
const projects = [
  {
    id: 1,
    title: "Gamatrain EdTech Platform",
    year: "2024",
    icon: "🎓",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    description:
      "An innovative EdTech platform designed to empower learners and developers through a decentralized, open-source ecosystem. Leverages governance tokens to foster collaboration and rewards.",
    tech: ["Vue 3", "Nuxt", "TypeScript", "Tailwind CSS", "Web3"],
    demo: "https://gamatrain.com",
    github: "https://github.com/GamaEdtech/gamatrain-front",
  },
  {
    id: 2,
    title: "Pateh - Flight Booking Platform",
    year: "2024",
    icon: "✈️",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    description:
      "A comprehensive online flight ticket booking system for domestic flights in Iran. Features real-time flight search, price comparison, secure payment integration, and 24/7 customer support.",
    tech: ["Vue 3", "Nuxt", "TypeScript", "Tailwind CSS", "API Integration"],
    demo: "https://www.pateh.com",
    github: "",
  },
  {
    id: 3,
    title: "Voice Assistant Bot",
    year: "2024",
    icon: "🎙️",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    description:
      "An intelligent voice assistant platform that provides the assistance you didn't know you needed. Features voice recognition, natural language processing, and automated task execution.",
    tech: ["Vue 3", "Nuxt", "AI/ML", "Speech Recognition", "NLP"],
    demo: "https://voice-assistant.bot",
    github: "",
  },
  {
    id: 4,
    title: "Red Crescent LMS",
    year: "2024",
    icon: "❤️",
    gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
    description:
      "A comprehensive Learning Management System for Red Crescent training programs. Features specialized courses in first aid, rescue operations, health & safety, and crisis management with certification.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Persian RTL"],
    demo: "https://red-crescent-lms-lp2i.vercel.app",
    github: "",
  },
  {
    id: 5,
    title: "AliExpress Clone",
    year: "2024",
    icon: "🛒",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    description:
      "A full-featured e-commerce platform clone of AliExpress, built with Vue.js. Features product browsing, shopping cart, user authentication, and modern UI/UX design.",
    tech: ["Vue 3", "Pinia", "Vue Router", "Tailwind CSS"],
    demo: "",
    github: "https://github.com/Matinj031/AliExpress-clone-v1",
  },
  {
    id: 6,
    title: "React Movie App",
    year: "2024",
    icon: "🎬",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    description:
      "A modern movie discovery application built with React. Browse trending movies, search for your favorites, and explore detailed information about films with a sleek interface.",
    tech: ["React", "JavaScript", "API Integration", "CSS"],
    demo: "",
    github: "https://github.com/Matinj031/ReactMovieApp",
  },
  {
    id: 7,
    title: "Python Slot Machine",
    year: "2023",
    icon: "🎰",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    description:
      "A simple and fun slot machine game built with Python. Features random number generation, betting system, and colorful terminal interface. Have fun and test your luck!",
    tech: ["Python", "Random Module", "Terminal UI"],
    demo: "",
    github: "https://github.com/Matinj031/Python-Slot-Machine",
  },
  {
    id: 8,
    title: "Python Snake Game",
    year: "2023",
    icon: "🐍",
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    description:
      "A classic Snake game implementation using Python and Tkinter GUI toolkit. Features smooth gameplay, score tracking, and collision detection with a retro gaming feel.",
    tech: ["Python", "Tkinter", "Game Development"],
    demo: "",
    github: "https://github.com/Matinj031/Python-SnakeGame",
  },
];

// SEO Configuration
const seoTitle = "Projects";
const seoDescription =
  "Matin Jahi (متین جاهی) Projects Portfolio - Explore my recent web development projects including Gamatrain EdTech Platform, Pateh Flight Booking, Voice Assistant Bot, and more. Specialized in Vue.js, Nuxt.js, React, and modern web technologies.";
const seoKeywords =
  "Matin Jahi projects, متین جاهی پروژه ها, frontend developer portfolio, نمونه کار برنامه نویس, Vue.js projects, Nuxt.js applications, React projects, web development portfolio, EdTech platform, flight booking system, voice assistant, LMS development, Isfahan developer projects, پروژه های وب";
const seoImage = "https://i.ibb.co/rdXtHqC/photo-2021-10-04-15-51-52.jpg";
const seoUrl = "https://matinjahi.netlify.app/projects";

// State management
const isLoading = ref(true);
const loadingProgress = ref("Preparing projects...");
let preloadAborted = false;

// Preload images cache
const imageCache = new Map<string, string>();

useHead({
  title: seoTitle,
  meta: [
    // Primary Meta Tags
    {
      name: "title",
      content: seoTitle,
    },
    {
      name: "description",
      content: seoDescription,
    },
    {
      name: "keywords",
      content: seoKeywords,
    },
    {
      name: "author",
      content: "Matin Jahi",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      name: "language",
      content: "English",
    },

    // Open Graph / Facebook
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: seoUrl,
    },
    {
      property: "og:title",
      content: seoTitle,
    },
    {
      property: "og:description",
      content: seoDescription,
    },
    {
      property: "og:image",
      content: seoImage,
    },
    {
      property: "og:site_name",
      content: "Matin Jahi Portfolio",
    },
    {
      property: "og:locale",
      content: "en_US",
    },

    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:url",
      content: seoUrl,
    },
    {
      name: "twitter:title",
      content: seoTitle,
    },
    {
      name: "twitter:description",
      content: seoDescription,
    },
    {
      name: "twitter:image",
      content: seoImage,
    },
    {
      name: "twitter:creator",
      content: "@matinjahi",
    },

    // Additional SEO
    {
      name: "theme-color",
      content: "#667eea",
    },
    {
      name: "msapplication-TileColor",
      content: "#667eea",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: seoUrl,
    },
  ],
  script: [
    // JSON-LD Structured Data
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: seoTitle,
        description: seoDescription,
        url: seoUrl,
        author: {
          "@type": "Person",
          name: "Matin Jahi",
          jobTitle: "Frontend Developer",
          url: "https://matinjahi.netlify.app",
          sameAs: [
            "https://github.com/Matinj031",
            "https://linkedin.com/in/matin-jahi",
            "https://t.me/Ritalleral",
          ],
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: project.title,
              description: project.description,
              url: project.demo || project.github,
              dateCreated: project.year,
              author: {
                "@type": "Person",
                name: "Matin Jahi",
              },
              keywords: project.tech.join(", "),
            },
          })),
        },
      }),
    },
  ],
});

// Preload link preview images
const preloadLinkPreviews = async () => {
  const projectsWithDemo = projects.filter((p) => p.demo);
  const total = projectsWithDemo.length;
  let loaded = 0;

  loadingProgress.value = `Loading previews (0/${total})...`;

  const preloadPromises = projectsWithDemo.map(async (project) => {
    try {
      const params = new URLSearchParams({
        url: project.demo,
        screenshot: "true",
        meta: "false",
        embed: "screenshot.url",
        colorScheme: "light",
        "viewport.isMobile": "true",
        "viewport.deviceScaleFactor": "1",
        "viewport.width": "1500",
        "viewport.height": "900",
      });

      const imageUrl = `https://api.microlink.io/?${params.toString()}`;

      // Preload image
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          imageCache.set(project.demo, imageUrl);
          loaded++;
          loadingProgress.value = `Loading previews (${loaded}/${total})...`;
          resolve(true);
        };
        img.onerror = () => {
          console.warn(`Failed to preload preview for ${project.demo}`);
          loaded++;
          loadingProgress.value = `Loading previews (${loaded}/${total})...`;
          resolve(false);
        };
        // Set timeout for slow loading images
        setTimeout(() => {
          loaded++;
          loadingProgress.value = `Loading previews (${loaded}/${total})...`;
          resolve(false);
        }, 5000);
        img.src = imageUrl;
      });
    } catch (error) {
      console.error(`Error preloading ${project.demo}:`, error);
    }
  });

  await Promise.all(preloadPromises);

  // Check if component was unmounted during preload
  if (preloadAborted) return;

  loadingProgress.value = "Ready!";

  // Small delay to show "Ready!" message
  setTimeout(() => {
    if (!preloadAborted) {
      isLoading.value = false;
    }
  }, 300);
};

onMounted(() => {
  preloadAborted = false;
  isLoading.value = true;
  preloadLinkPreviews();
});

onBeforeUnmount(() => {
  preloadAborted = true;
  isLoading.value = true;
});
</script>

<style scoped>
/* Glassy Card Effect */
.glassyCard {
  background: rgba(255, 255, 255, 0);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.082);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.158);
}

/* Tech Badge Animations */
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

/* Staggered floating animation on card hover */
.group:hover .tech-badge {
  animation: float 3s ease-in-out infinite;
}

.group:hover .tech-badge:nth-child(1) {
  animation-delay: 0s;
}
.group:hover .tech-badge:nth-child(2) {
  animation-delay: 0.1s;
}
.group:hover .tech-badge:nth-child(3) {
  animation-delay: 0.2s;
}
.group:hover .tech-badge:nth-child(4) {
  animation-delay: 0.3s;
}
.group:hover .tech-badge:nth-child(5) {
  animation-delay: 0.4s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}
</style>
