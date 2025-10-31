<template>
  <nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50">
    <div
      class="flex items-center gap-8 px-6 py-3 rounded-full bg-black/30 border border-white/20 backdrop-blur-3xl"
    >
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-white font-semibold text-base hover:opacity-80 transition-opacity"
      >
        <svg
          class="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            fill="currentColor"
            opacity="0.5"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Matin Jahi</span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.href"
          class="px-4 py-1.5 text-sm text-white/70 hover:text-white transition-colors"
        >
          {{ item.name }}
        </NuxtLink>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="isOpen = !isOpen"
        class="md:hidden p-1.5 text-white"
        aria-label="Toggle menu"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            v-if="!isOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-2 rounded-2xl bg-black/90 backdrop-blur-md border border-white/10"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.href"
          @click="isOpen = false"
          class="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);

const navItems = [
  { name: "Home", href: "/" },
  { name: "Apps", href: "/apps" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];
</script>

<style scoped>
@import "tailwindcss/theme" reference;
@import "tailwindcss/utilities" reference;
</style>
