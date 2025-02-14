<script setup lang="ts">
const { $gsap: gsap } = useNuxtApp()

const cursor = ref(null)
const cursorFollower = ref(null)
const cursorVisible = ref(false)

onMounted(() => {
    // Set initial position
    gsap.set([cursor.value, cursorFollower.value], {
        xPercent: -50,
        yPercent: -50,
    })

    // Animation variables
    const xTo = gsap.quickTo(cursor.value, 'x', { duration: 0.2, ease: 'power3' })
    const yTo = gsap.quickTo(cursor.value, 'y', { duration: 0.2, ease: 'power3' })
    const xFollower = gsap.quickTo(cursorFollower.value, 'x', {
        duration: 0.6,
        ease: 'power3',
    })
    const yFollower = gsap.quickTo(cursorFollower.value, 'y', {
        duration: 0.6,
        ease: 'power3',
    })

    // Mouse move handler
    window.addEventListener('mousemove', (e) => {
        cursorVisible.value = true
        xTo(e.clientX)
        yTo(e.clientY)
        xFollower(e.clientX)
        yFollower(e.clientY)
    })

    window.addEventListener('mousedown', () => {
        gsap.to([cursor.value, cursorFollower.value], {
            scale: 1.5,
            duration: 0.3,
        })
    })

    window.addEventListener('mouseup', () => {
        gsap.to([cursor.value, cursorFollower.value], {
            scale: 1,
            duration: 0.3,
        })
    })

    window?.addEventListener('mouseout', () => {
        cursorVisible.value = false
        gsap.to([cursor.value, cursorFollower.value], {
            scale: 1,
            duration: 0.3,
        })
    })

    // Add hover effect for links
    const links = document.querySelectorAll('a, button')
    links.forEach((link) => {
        link.addEventListener('mouseenter', () => {
            gsap.to([cursor.value, cursorFollower.value], {
                scale: 1.5,
                duration: 0.3,
                css: { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
                ease: 'power3',
            })
        })
        link.addEventListener('mouseleave', () => {
            gsap.to([cursor.value, cursorFollower.value], {
                scale: 1,
                duration: 0.3,
                css: { backgroundColor: 'unset' },
            })
        })
    })
})
</script>

<template>
    <div v-show="cursorVisible" class="cursor-wrapper">
        <div ref="cursor" class="cursor" />
        <div ref="cursorFollower" class="cursor-follower" />
    </div>
</template>

<style scoped>
.cursor-wrapper {
  pointer-events: none;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
}

.cursor {
  width: 8px;
  height: 8px;
  background: #42FFFF;;
  border-radius: 100%;
  position: fixed;
  z-index: 2;
}

.cursor-follower {
  width: 40px;
  height: 40px;
  border: 1px solid #42FFFF;;
  border-radius: 100%;
  position: fixed;
  z-index: 1;
}
</style>