<template>
  <NuxtLayout>
    <section
      class="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <p class="text-sm font-medium tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-4">
        {{ error.statusCode === 404 ? "Page not found" : "Something went wrong" }}
      </p>
      <h1
        class="text-7xl md:text-9xl font-bold text-black dark:text-white mb-6"
      >
        {{ error.statusCode }}
      </h1>
      <h2 class="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-md">
        {{
          error.statusCode === 404
            ? "The page you're looking for doesn't exist or has been moved."
            : error.statusMessage || "An unexpected error occurred."
        }}
      </h2>
      <nav class="flex flex-wrap items-center justify-center gap-4" aria-label="Recovery links">
        <NuxtLink
          to="/"
          class="px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:scale-105 transition-transform"
        >
          Back to Home
        </NuxtLink>
        <NuxtLink
          to="/projects"
          class="px-6 py-3 rounded-full border border-black/20 dark:border-white/20 text-black dark:text-white font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          View Projects
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="px-6 py-3 rounded-full border border-black/20 dark:border-white/20 text-black dark:text-white font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          Contact Me
        </NuxtLink>
      </nav>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; statusMessage?: string } }>();

useHead({
  title: `${props.error.statusCode} — Matin Jahi`,
  meta: [{ name: "robots", content: "noindex" }],
});
</script>
