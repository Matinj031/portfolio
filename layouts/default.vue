<script setup lang="ts"></script>

<template>
  <div>
    <InspiraNav />
    <slot />
  </div>
</template>

<style>
@import "tailwindcss/theme" reference;
@import "tailwindcss/utilities" reference;

* {
  cursor: none !important;
  user-select: none !important;
}

body {
  @apply bg-white dark:bg-gray-900 text-black dark:text-white;
}
</style>
