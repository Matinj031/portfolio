<script setup lang="ts">
import { useMouseEnter } from '~/composables/useMouseEnter'

const props = withDefaults(defineProps<{
    as?: string
    className?: string
    translateX?: number
    translateY?: number
    translateZ?: number
    rotateX?: number
    rotateY?: number
    rotateZ?: number
}>(), {
    as: 'div',
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
})

const itemRef = ref<HTMLElement | null>(null)
const { isMouseEntered } = useMouseEnter()

const hasImage = computed(() => {
    if (!itemRef.value)
        return false
    return itemRef.value.querySelector('img') !== null
})

watch(isMouseEntered, (entered) => {
    if (!itemRef.value)
        return
    const transform = entered
        ? `translateX(${props.translateX}px) translateY(${props.translateY}px) translateZ(${props.translateZ}px) rotateX(${props.rotateX}deg) rotateY(${props.rotateY}deg) rotateZ(${props.rotateZ}deg)`
        : 'translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
    itemRef.value.style.transform = transform

    // Add shadow effect for images
    if (hasImage.value) {
        const img = itemRef.value.querySelector('img')
        if (img) {
            img.style.filter = entered ? 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))' : ''
        }
    }
})
</script>

<template>
    <component
        :is="as"
        ref="itemRef"
        class="w-fit transition-all duration-200 ease-linear" :class="[
            className,
            { 'has-image': hasImage },
        ]"
    >
        <slot />
    </component>
</template>

<style scoped>
.has-image img {
    transition: filter 0.2s ease-linear;
}
</style>
