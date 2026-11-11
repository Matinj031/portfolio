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
  @apply bg-background text-foreground;
}
</style>
