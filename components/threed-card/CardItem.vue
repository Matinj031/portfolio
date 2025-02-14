<script setup lang="ts">
import { useMouseEnter } from '~/composables/useMouseEnter'

const props = withDefaults(defineProps<{
    as?: string
    translateZ?: number
    className?: string
}>(), {
    as: 'div',
    translateZ: 0
})

const { isMouseEntered } = useMouseEnter()
</script>

<template>
    <component
        :is="as"
        class="card-content transition-transform duration-200"
        :class="[className]"
        :style="{
            transform: isMouseEntered ? `translateZ(${translateZ}px)` : 'translateZ(0)',
            transition: 'transform 0.3s ease'
        }"
    >
        <slot />
    </component>
</template>

<style scoped>
.card-content {
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transform: translateZ(0);
}
</style>
