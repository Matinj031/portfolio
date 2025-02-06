<script lang="ts" setup>
const { $gsap: gsap } = useNuxtApp()
const isReady = ref(false)
const n = ref(19)
const timelines = ref<gsap.core.Timeline[]>([])
const trayRef = ref(null)
const cubesRef = ref<HTMLElement[]>([])

const rots = ref([
    { ry: 270, a: 0.5 },
    { ry: 0, a: 0.85 },
    { ry: 90, a: 0.4 },
    { ry: 180, a: 0.0 },
])

const loadingTexts = ['LOADING', 'PLEASE', 'WAIT']

function getFaceStyle(cubeIndex: number, faceIndex: number) {
    return {
        fontSize: '60px',
        color: `hsl(${cubeIndex / n.value * 75 + 130}, 67%, ${100 * rots.value[faceIndex]?.a}%)`,
    }
}

// Debounced resize handler
const handleResize = useDebounceFn(() => {
    const h = n.value * 64
    gsap?.set(trayRef.value, { height: h })
    gsap?.set('.pov', { scale: window?.innerHeight / h })
}, 16)

onBeforeMount(() => {
    if (process.client) {
        gsap.set('body', { overflow: 'hidden' })
    }
})

onMounted(() => {
    if (process.client && n.value) {
    // Initial setup
        gsap.set(trayRef.value, { opacity: 0, visibility: 'hidden' })

        // Create master timeline
        const masterTl = gsap.timeline()

        // Setup faces
        gsap.set('.face', {
            z: 200,
            rotateY: i => rots.value[i % 3]?.ry,
            transformOrigin: '50% 50% -201px',
        })

        nextTick(() => {
            isReady.value = true

            // Fade in tray
            masterTl.to(trayRef.value, {
                opacity: 1,
                visibility: 'visible',
                duration: 0.3,
            })

            // Cube animations
            cubesRef.value.forEach((cube, i) => {
                const cubeTl = gsap.timeline({
                    repeat: -1,
                    yoyo: true,
                    defaults: { ease: 'power3.inOut' },
                })

                cubeTl
                    .fromTo(cube, { rotateY: -90 }, {
                        rotateY: 90,
                        duration: 2,
                        ease: 'power1.inOut',
                    })
                    .fromTo(cube.querySelectorAll('.face'), { color: j => `hsl(${i / n.value * 75 + 130}, 67%,${100 * [rots.value[3]?.a, rots.value[0]?.a, rots.value[1]?.a][j]}%)` }, { color: j => `hsl(${i / n.value * 75 + 130}, 67%,${100 * [rots.value[0]?.a, rots.value[1]?.a, rots.value[2]?.a][j]}%)` }, 0)
                    .progress(i / n.value)

                timelines.value.push(cubeTl)
            })

            // Tray animation
            const trayTl = gsap.timeline({ repeat: -1, yoyo: true })
            trayTl
                .fromTo(trayRef.value, { yPercent: -3, rotate: -15, scale: 1 }, { yPercent: 3, rotate: 15, scale: 1.2, duration: 2, ease: 'power1.inOut' },
                )

            timelines.value.push(trayTl)

            // Initialize resize
            window.addEventListener('resize', handleResize)
            handleResize()
        })
    }
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    timelines.value.forEach(tl => tl?.kill())
    gsap.set('body', { overflow: '' })
})
function useDebounceFn(fn: (...args: any[]) => void, delay: number) {
    let timeoutId: number | null = null

    return function (...args: any[]) {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }

        timeoutId = window.setTimeout(() => {
            fn(...args)
        }, delay)
    }
}
</script>

<template>
    <Transition name="fade">
        <div v-show="isReady" class="pov">
            <div ref="trayRef" class="tray loading-initial">
                <template v-for="index in n" :key="index">
                    <div class="die">
                        <div ref="cubesRef" class="cube">
                            <div
                                v-for="(text, faceIndex) in loadingTexts"
                                :key="faceIndex"
                                class="face"
                                :style="getFaceStyle(index, faceIndex)"
                            >
                                {{ text }}
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');

.pov {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.tray {
  display: flex;
  flex-direction: column;
  gap: 2px;
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
}

.die {
  width: 400px;
  height: 55px;
  position: relative;
  perspective: 999px;
}

.cube {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  backface-visibility: hidden;
  letter-spacing: 0.1em;
  filter: drop-shadow(0 0 5px rgba(255,255,255,0.2));
  will-change: transform, color;
  transform: translate3d(0, 0, 0);
}

.loading-initial {
  opacity: 0;
  visibility: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
