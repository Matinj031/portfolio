<script setup lang="ts">
/**
 * Theme toggle — the single source of truth is @nuxtjs/color-mode.
 *
 * The icons are driven purely by CSS (the `.dark` class on <html>), so the
 * server-rendered markup always matches the client and there is no hydration
 * mismatch. The accessible state (`aria-label` / `aria-pressed`) is resolved
 * on mount, when the real preference is known.
 */
const colorMode = useColorMode()

const isDark = ref(false)

function syncIsDark() {
  isDark.value = colorMode.value === 'dark'
}

onMounted(() => {
  syncIsDark()
  watch(() => colorMode.value, syncIsDark)
})

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    :aria-pressed="isDark"
    :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="toggleTheme"
  >
    <!-- Sun (shown in light mode) -->
    <svg
      class="theme-icon theme-icon--sun"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
      />
    </svg>

    <!-- Moon (shown in dark mode) -->
    <svg
      class="theme-icon theme-icon--moon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  position: relative;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  border: 1px solid var(--glass-border);
  background-color: var(--glass-bg);
  color: var(--foreground);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  cursor: pointer;
  transition:
    background-color 250ms ease,
    border-color 250ms ease,
    color 250ms ease,
    transform 250ms ease;
}

.theme-toggle:hover {
  background-color: var(--accent-hover);
  transform: translateY(-1px);
}

.theme-toggle:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--background),
    0 0 0 4px var(--ring);
}

.theme-icon {
  position: absolute;
  width: 1.125rem;
  height: 1.125rem;
  transition:
    opacity 300ms ease,
    transform 300ms ease;
}

/* Light mode → sun */
.theme-icon--sun {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}
.dark .theme-icon--sun {
  opacity: 0;
  transform: rotate(90deg) scale(0.4);
}

/* Dark mode → moon */
.theme-icon--moon {
  opacity: 0;
  transform: rotate(-90deg) scale(0.4);
}
.dark .theme-icon--moon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .theme-toggle,
  .theme-icon {
    transition: none;
  }
}
</style>
