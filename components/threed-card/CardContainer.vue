<script setup lang="ts">
import { provideMouseEnter } from '~/composables/useMouseEnter'

defineProps<{
    className?: string
}>()

const containerRef = ref<HTMLElement | null>(null)
const { setIsMouseEntered } = provideMouseEnter()
let isActive = false

const handleMouseMove = throttle((e: MouseEvent) => {
    if (!containerRef.value || !isActive) return

    const rect = containerRef.value.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 25
    const y = (e.clientY - rect.top - rect.height / 2) / 25
    containerRef.value.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
}, 16)

function handleMouseEnter() {
    isActive = true
    setIsMouseEntered(true)
}

function handleMouseLeave() {
    isActive = false
    if (!containerRef.value) return
    setIsMouseEntered(false)
    containerRef.value.style.transform = `rotateY(0deg) rotateX(0deg)`
}

// Throttle function
function throttle(fn: Function, delay: number) {
    let lastTime = 0
    return (...args: any[]) => {
        const now = Date.now()
        if (now - lastTime >= delay) {
            fn(...args)
            lastTime = now
        }
    }
}

onUnmounted(() => {
    isActive = false
})
</script>

<template>
    <div class="flex items-center justify-center max-w-fit" style="perspective: 1000px;">
        <div
            ref="containerRef"
            class="flex items-center justify-center relative transition-all duration-200 ease-linear"
            :class="className"
            style="transform-style: preserve-3d;"
            @mouseenter="handleMouseEnter"
            @mousemove="handleMouseMove"
            @mouseleave="handleMouseLeave"
        >
            <slot />
        </div>
    </div>
</template>
