<script setup lang="ts">
/**
 * Language switcher — a segmented control made of real links so every language
 * version keeps its own crawlable URL (no JS-only toggling, no flags).
 *
 * Each link resolves the localized variant of the *current* route through
 * `useSwitchLocalePath()` and preserves the query string + hash, so switching
 * language never drops you back on the homepage.
 */
const { locale, locales, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();

const availableLocales = computed(
  () => locales.value as Array<{ code: string; name: string }>,
);

function targetFor(code: string) {
  const path = switchLocalePath(code) || "/";
  return { path, query: route.query, hash: route.hash };
}
</script>

<template>
  <nav
    :aria-label="t('nav.languageLabel')"
    class="lang-switch inline-flex items-center rounded-full p-0.5"
  >
    <NuxtLink
      v-for="loc in availableLocales"
      :key="loc.code"
      :to="targetFor(loc.code)"
      :hreflang="loc.code"
      :lang="loc.code"
      class="lang-switch__item"
      :class="{ 'lang-switch__item--active': loc.code === locale }"
      :aria-current="loc.code === locale ? 'page' : undefined"
      :aria-label="loc.name"
    >
      {{ loc.code === "fa" ? "FA" : "EN" }}
    </NuxtLink>
  </nav>
</template>

<style scoped>
.lang-switch {
  border: 1px solid var(--glass-border);
  background-color: var(--glass-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.lang-switch__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.25rem;
  height: 1.9rem;
  padding: 0 0.55rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--muted-foreground);
  transition:
    color 200ms ease,
    background-color 200ms ease;
}

.lang-switch__item:hover {
  color: var(--foreground);
}

.lang-switch__item--active {
  color: var(--background);
  background-color: var(--foreground);
}

.lang-switch__item:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--background),
    0 0 0 4px var(--ring);
}

@media (prefers-reduced-motion: reduce) {
  .lang-switch__item {
    transition: none;
  }
}
</style>
