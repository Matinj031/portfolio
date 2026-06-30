<script setup lang="ts"></script>

<template>
  <div>
    <InspiraNav />
    <slot />
  </div>
</template>

<style>
@reference "../assets/css/main.css";

* {
  cursor: none !important;
  user-select: none !important;
}

body {
  @apply bg-white dark:bg-gray-900 text-black dark:text-white;
}
</style>
