<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const textContainer = ref(null)
const textLayers = ref(['CREATIVE', 'DEVELOPER', 'PORTFOLIO'])

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()
const ctx = ref()
onMounted(() => {
    if (!textContainer.value) return
    ctx.value = gsap.context((self) => {
        const text = self.selector('.text-layer')

        // Initial state
        gsap.set(text, {
            y: 100,
            opacity: 0,
        })

        // Entrance animation
        const tl = gsap.timeline()

        tl.to(text, {
            y: 0,
            opacity: 1,
            stagger: 0.2,
        })

        // Scroll animation
        ScrollTrigger?.create({
            trigger: '.hero-section',
            start: 'top top',
            end: '+=100px',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
                const progress = self.progress
                gsap.to(text, {
                    y: -progress * 100,
                    opacity: 1 - progress,
                    duration: 0.5,
                    overwrite: 'auto',
                    stagger: 0.2,
                })
            }
        })

        // Hover animation
        const hoverTl = gsap.timeline({ paused: true })


        // Click animation
        textContainer.value.addEventListener('click', () => {
            gsap.to('.text-layer', {
                skewX: 'random(-20, 20)',
                duration: 0.1,
                repeat: 1,
                yoyo: true,
                overwrite: 'auto'
            })
        })
    }, textContainer.value) // Scope to component
})

onUnmounted(() => {
    ctx.revert() // Single line cleanup
})
</script>

<template>
    <div class="hero-section relative" ref="textContainer">
        <div class="text-container absolute inset-0 flex flex-col items-center justify-center">
            <div v-for="(text, index) in textLayers" 
                 :key="index" 
                 class="text-layer relative"
                 :style="{ zIndex: textLayers.length - index }">
                {{ text }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.hero-section {
    min-height: 100vh;
    width: 100%;
    perspective: 1000px;
    transform-style: preserve-3d;
    overflow: hidden;
}

.text-container {
    transform-style: preserve-3d;
    width: 100%;
}

.text-layer {
    font-family: "wild_worldbold", sans-serif;
    font-size: clamp(1.9rem, 8vw, 8rem);
    font-weight: 900;
    line-height: 1;
    color: white;
    text-transform: uppercase;
    mix-blend-mode: difference;
    filter: drop-shadow(0 0 10px rgba(66, 255, 255, 0.3));
    transition: filter 0.3s ease;
    will-change: transform;
    -webkit-font-smoothing: antialiased;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    width: 100%;
    text-align: center;
}

.text-layer::before {
    content: attr(data-text);
    position: absolute;
    left: 2px;
    text-shadow: -1px 0 #42ffff;
    top: 0;
    color: white;
    overflow: hidden;
    clip-path: inset(0 0 0 0);
}

.text-layer::after {
    content: attr(data-text);
    position: absolute;
    left: -2px;
    text-shadow: 1px 0 #ff1744;
    top: 0;
    color: white;
    overflow: hidden;
    clip-path: inset(0 0 0 0);
}


.text-layer {
  position: relative;
}

.text-layer:nth-child(2),.text-layer::after {
  margin: 0;
  background: linear-gradient(90deg in lch longer hue, oklch(105% 90% 0) 0 0);
  background-size: 500% 100%;
  animation: blend 30s infinite linear;
  color: transparent;
  background-clip: text;
  
}

.text-layer::after {
  content: attr(data-text);
  filter: blur(8px);
  position: absolute;
/*   z-index: -1; */
  left: 0;
  mix-blend-mode: plus-lighter;
}

@keyframes blend {
  to { background-position: 500% 100%; }
}
</style>
