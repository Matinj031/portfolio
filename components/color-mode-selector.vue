<template>
  <div class="flex space-x-2 items-center">
    <div class="text-gray-500 text-xs" v-if="showNextModeLabel">
      Change to {{ nextMode }}
    </div>
    <button
      @click="toggleMode"
      class="hover:bg-gray-100 dark:hover:bg-gray-500 px-2 py-2 md:py-1 text-gray-500 rounded-full md:rounded-md drop-shadow-sm text-4xl md:text-base"
      @mouseenter="showNextModeLabel = true"
      @mouseleave="showNextModeLabel = false"
    >
      {{ nextModeIcon }}
    </button>
  </div>
</template>

<script setup>
const showNextModeLabel = ref({ value: false });
const colorMode = useColorMode();
const modes = [
  "system", // 0
  "light", // 1
  "dark", // 2
];

const nextModeIcons = {
  system: "🌓",
  light: "🌕",
  dark: "🌑",
};

const nextMode = computed(() => {
  const currentModeIndex = modes.indexOf(colorMode.preference);
  let nextModeIndex = null;
  if (currentModeIndex + 1 === modes.length) {
    nextModeIndex = 0;
  } else {
    nextModeIndex = currentModeIndex + 1;
  }
  return modes[nextModeIndex];
});
const nextModeIcon = computed(() => nextModeIcons[nextMode.value]);

const toggleMode = () => (colorMode.preference = nextMode.value);
</script>

<style></style>
