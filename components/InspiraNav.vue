<template>
  <div class="relative top-0 w-full z-[99999999]">
    <PatternBackground
      :animate="true"
      :direction="PATTERN_BACKGROUND_DIRECTION.Bottom"
      :variant="PATTERN_BACKGROUND_VARIANT.BigDot"
      class="flex w-full items-center justify-center"
      :speed="PATTERN_BACKGROUND_SPEED.Slow"
      :mask="PATTERN_BACKGROUND_MASK.EllipseTop"
    >
      <LiquidGlassMenu container-class="fixed top-3 z-[999999]" :scale="-85" :frost="0.001" yChannel="G" :lightness="55" :border="0.2" blend="overlay">
        <div
          class="w-full min-h-16 py-4 px-4 sm:px-8 md:px-12 flex items-center justify-center"
        >
          <div class="flex items-center gap-3 sm:gap-6 md:gap-8">
            <!-- Logo -->
            <NuxtLink
              :to="localePath('/')"
              class="flex items-center gap-2 text-foreground font-semibold text-base hover:opacity-80 transition-opacity"
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
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
            <nav class="hidden md:flex items-center gap-1" :aria-label="$t('nav.mainLabel')">
              <NuxtLink
                v-for="item in navItems"
                :key="item.href"
                :to="localePath(item.href)"
                class="px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                :class="{ 'text-foreground font-medium': isActive(item.href) }"
                :aria-current="isActive(item.href) ? 'page' : undefined"
              >
                {{ item.name }}
              </NuxtLink>
            </nav>

            <!-- Language Switcher -->
            <LanguageSwitcher />

            <!-- Theme Toggle -->
            <ThemeToggle />

            <!-- Mobile Menu Button -->
            <button
              @click="isOpen = !isOpen"
              class="md:hidden p-1.5 text-foreground"
              :aria-label="$t('nav.openMenu')"
              :aria-expanded="isOpen"
              aria-controls="mobile-menu"
              type="button"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  v-if="!isOpen"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </LiquidGlassMenu>
    </PatternBackground>

    <!-- Mobile Navigation Panel -->
    <Transition name="mobile-menu">
      <nav
        v-if="isOpen"
        id="mobile-menu"
        class="md:hidden fixed top-24 inset-x-4 z-[999999] rounded-2xl p-2"
        :style="{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: 'var(--glass-shadow)',
        }"
        :aria-label="$t('nav.mobileLabel')"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.href"
          :to="localePath(item.href)"
          class="block px-4 py-3 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
          :class="{ 'text-foreground font-medium': isActive(item.href) }"
          :aria-current="isActive(item.href) ? 'page' : undefined"
          @click="isOpen = false"
        >
          {{ item.name }}
        </NuxtLink>
      </nav>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_MASK,
  PATTERN_BACKGROUND_SPEED,
  PATTERN_BACKGROUND_VARIANT,
} from "./pattern-background";

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const isOpen = ref(false);

const navItems = computed(() => [
  { name: t("nav.home"), href: "/" },
  { name: t("nav.projects"), href: "/projects/" },
  { name: t("nav.about"), href: "/about/" },
  { name: t("nav.contact"), href: "/contact/" },
]);

const normalize = (path: string) =>
  path !== "/" ? path.replace(/\/+$/, "") : path;

function isActive(href: string) {
  return normalize(localePath(href)) === normalize(route.path);
}

// Close the mobile menu whenever the route changes.
watch(() => route.fullPath, () => {
  isOpen.value = false;
});
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: none;
  }
}
</style>
