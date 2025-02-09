<script setup lang="ts">
defineProps<{
    className?: string
}>()
</script>

<template>
    <div class="h-96 w-96" :class="[className]" style="transform-style: preserve-3d;">
        <slot />
    </div>
</template>
