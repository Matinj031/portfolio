<template>
  <div class="container mx-auto max-w-4xl">
    <header class="flex justify-between items-center mt-5">
      <div class="flex items-center md:space-x-12">
        <NuxtLink
          to="/"
          class="text-xl font-semibold p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          Matin jahi
        </NuxtLink>
      </div>
      <ClientOnly>
        <color-mode-selector />
      </ClientOnly>
    </header>
    <main class="p-2 mt-10">
      <slot />
    </main>
  </div>
</template>

<script setup></script>

<style>
body {
  @apply bg-white dark:bg-gray-900 text-black dark:text-white;
}
</style>
