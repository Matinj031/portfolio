<script setup lang="ts">
import { provideMouseEnter } from '~/composables/useMouseEnter'
import { useNuxtApp } from '#app'

const props = defineProps<{
    className?: string
}>()

const containerRef = ref<HTMLElement | null>(null)
const { setIsMouseEntered } = provideMouseEnter()
let isActive = false

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()
const ctx = ref()

onMounted(() => {
    if (!containerRef.value) return

    ctx.value = gsap.context((self) => {
        // Initial state
        gsap.set(containerRef.value, {
            opacity: 0,
            y: 100,
            rotateX: -15,
            scale: 0.9
        })

        // Scroll trigger animation
        ScrollTrigger.create({
            trigger: containerRef.value,
            start: 'top bottom-=100',
            end: 'bottom center',
            onEnter: () => {
                gsap.to(containerRef.value, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    clearProps: 'all'
                })
            }
        })
    })
})

onUnmounted(() => {
    if (ctx.value) {
        ctx.value.revert()
    }
    isActive = false
})

const handleMouseMove = throttle((e: MouseEvent) => {
    if (!containerRef.value || !isActive) return

    const rect = containerRef.value.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 25
    const y = (e.clientY - rect.top - rect.height / 2) / 25
    
    gsap.to(containerRef.value, {
        rotateY: x,
        rotateX: y,
        duration: 0.5,
        ease: 'power2.out'
    })
}, 16)

function handleMouseEnter() {
    isActive = true
    setIsMouseEntered(true)
    
    if (containerRef.value) {
        gsap.to(containerRef.value, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        })
    }
}

function handleMouseLeave() {
    isActive = false
    if (!containerRef.value) return
    setIsMouseEntered(false)
    
    gsap.to(containerRef.value, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
    })
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

<style scoped>
.card-container {
    will-change: transform;
    transition: box-shadow 0.3s ease;
}

.card-container:hover {
    box-shadow: 0 0 30px rgba(66, 255, 255, 0.2);
}
</style>
