<script setup lang="ts">
import { useNuxtApp } from '#app'

const props = defineProps<{
    className?: string
}>()

const cardRef = ref(null)
const { $gsap: gsap } = useNuxtApp()
const ctx = ref()

onMounted(() => {
    if (!cardRef.value) return

    ctx.value = gsap.context((self) => {
        // Initial state for inner elements
        gsap.set(self.selector('.card-content'), {
            opacity: 0,
            y: 20
        })

        // Animate inner elements when card becomes visible
        gsap.to(self.selector('.card-content'), {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: cardRef.value,
                start: 'top bottom-=50',
                end: 'bottom center',
                toggleActions: 'play none none reverse'
            }
        })
    }, cardRef.value)
})

onUnmounted(() => {
    if (ctx.value) {
        ctx.value.revert()
    }
})
</script>

<template>
    <div ref="cardRef" 
         class="h-96 w-96 card-body" 
         :class="[className]"
         style="transform-style: preserve-3d; backface-visibility: hidden;">
        <slot />
    </div>
</template>

<style scoped>
.card-body {
    transition: all 0.3s ease;
    transform: translateZ(0);
}

.card-body :deep(.card-content) {
    transform: translateZ(0);
    will-change: transform, opacity;
}
</style>
