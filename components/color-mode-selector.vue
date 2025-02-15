<script setup>
const showNextModeLabel = ref({ value: false })
const colorMode = useColorMode()
const modes = [
    'system', // 0
    'light', // 1
    'dark', // 2
]

const nextModeIcons = {
    system: '🌓',
    light: '🌕',
    dark: '🌑',
}

const nextMode = computed(() => {
    const currentModeIndex = modes.indexOf(colorMode.preference)
    let nextModeIndex = null
    if (currentModeIndex + 1 === modes.length) {
        nextModeIndex = 0
    }
    else {
        nextModeIndex = currentModeIndex + 1
    }
    return modes[nextModeIndex]
})
const nextModeIcon = computed(() => nextModeIcons[nextMode.value])

const toggleMode = () => (colorMode.preference = nextMode.value)
</script>

<template>
    <div class="flex space-x-2 items-center">
        <div v-if="showNextModeLabel" class="text-gray-300 dark:text-gray-50 text-xs">
            Change to {{ nextMode }}
        </div>
        <button
            class="hover:bg-gray-500 px-2 py-2 text-center text-gray-500 rounded-full md:rounded-full drop-shadow-sm text-4xl md:text-base"
            @click="toggleMode"
            @mouseenter="showNextModeLabel = true"
            @mouseleave="showNextModeLabel = false"
        >
            {{ nextModeIcon }}
        </button>
    </div>
</template>

<style></style>
