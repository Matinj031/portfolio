<script setup></script>

<template>
    <div class="mx-auto">
        <header class="flex justify-between items-center py-4 fixed top-0 left-0 z-50 w-full px-8 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all">
            <div class="flex items-center md:space-x-12 ">
                <NuxtLink
                    to="/"
                    class="text-xl font-semibold"
                >
                    Matin jahi
                </NuxtLink>
            </div>
            <ClientOnly>
                <color-mode-selector />
            </ClientOnly>
        </header>
        <main>
            <slot />
        </main>
    </div>
</template>

<style>
  * {
    cursor: none !important;
    user-select: none !important;
  }

body {
  @apply bg-white dark:bg-gray-900 text-black dark:text-white;
}
</style>
