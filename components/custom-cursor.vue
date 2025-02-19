<script setup lang="ts">
const { $gsap: gsap } = useNuxtApp()

const cursor = ref<HTMLElement | null>(null)
const cursorFollower = ref<HTMLElement | null>(null)
const cursorVisible = ref(false)
let xTo: gsap.QuickToFunc
let yTo: gsap.QuickToFunc
let xFollower: gsap.QuickToFunc
let yFollower: gsap.QuickToFunc

const handleMouseMove = (e: MouseEvent) => {
    if (!xTo || !yTo || !xFollower || !yFollower) return
    cursorVisible.value = true
    xTo(e.clientX)
    yTo(e.clientY)
    xFollower(e.clientX)
    yFollower(e.clientY)
}

const handleMouseDown = () => {
    if (!cursor.value || !cursorFollower.value || !gsap) return
    gsap.to([cursor.value, cursorFollower.value], {
        scale: 1.5,
        duration: 0.3,
    })
}

const handleMouseUp = () => {
    if (!cursor.value || !cursorFollower.value || !gsap) return
    gsap.to([cursor.value, cursorFollower.value], {
        scale: 1,
        duration: 0.3,
    })
}

const handleMouseOut = () => {
    if (!cursor.value || !cursorFollower.value || !gsap) return
    cursorVisible.value = false
    gsap.to([cursor.value, cursorFollower.value], {
        scale: 1,
        duration: 0.3,
    })
}

const handleLinkEnter = () => {
    if (!cursor.value || !cursorFollower.value || !gsap) return
    gsap.to([cursor.value, cursorFollower.value], {
        scale: 1.5,
        duration: 0.3,
        css: { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
        ease: 'power3',
    })
}

const handleLinkLeave = () => {
    if (!cursor.value || !cursorFollower.value || !gsap) return
    gsap.to([cursor.value, cursorFollower.value], {
        scale: 1,
        duration: 0.3,
        css: { backgroundColor: 'unset' },
    })
}

onMounted(() => {
    if (!cursor.value || !cursorFollower.value || !gsap) return

    // Set initial position
    gsap.set([cursor.value, cursorFollower.value], {
        xPercent: -50,
        yPercent: -50,
    })

    // Animation variables
    xTo = gsap.quickTo(cursor.value, 'x', { duration: 0.2, ease: 'power3' })
    yTo = gsap.quickTo(cursor.value, 'y', { duration: 0.2, ease: 'power3' })
    xFollower = gsap.quickTo(cursorFollower.value, 'x', {
        duration: 0.6,
        ease: 'power3',
    })
    yFollower = gsap.quickTo(cursorFollower.value, 'y', {
        duration: 0.6,
        ease: 'power3',
    })

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseout', handleMouseOut)

    // Add hover effect for links
    nextTick(() => {
        const links = document.querySelectorAll('a, button')
        links.forEach((link) => {
            link.addEventListener('mouseenter', handleLinkEnter)
            link.addEventListener('mouseleave', handleLinkLeave)
        })
    })
})

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mousedown', handleMouseDown)
    window.removeEventListener('mouseup', handleMouseUp)
    window.removeEventListener('mouseout', handleMouseOut)

    const links = document.querySelectorAll('a, button')
    links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkEnter)
        link.removeEventListener('mouseleave', handleLinkLeave)
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
  width: 100%;
  height: 100%;
}

.cursor {
  width: 8px;
  height: 8px;
  background: #42FFFF;
  border-radius: 100%;
  position: fixed;
  z-index: 2;
  mix-blend-mode: difference;
}

.cursor-follower {
  width: 40px;
  height: 40px;
  border: 1px solid #42FFFF;
  border-radius: 100%;
  position: fixed;
  z-index: 1;
  mix-blend-mode: difference;
}
</style>