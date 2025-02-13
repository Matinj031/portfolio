<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let animationFrameId: number

interface Particle {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  originalX: number
  originalY: number
}

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function createParticles() {
  const canvas = canvasRef.value
  if (!canvas) return

  particles = []
  const particleCount = 1000
  const radius = 1

  for (let i = 0; i < particleCount; i++) {
    const x = random(0, canvas.width)
    const y = random(0, canvas.height)
    const vx = random(-0.5, 0.5)
    const vy = random(-0.5, 0.5)

    particles.push({
      x,
      y,
      radius,
      vx,
      vy,
      originalX: x,
      originalY: y
    })
  }
}

function drawParticles() {
  if (!ctx || !canvasRef.value) return

  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  particles.forEach(particle => {
    ctx!.beginPath()
    ctx!.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    ctx!.fillStyle = '#ffffff'
    ctx!.fill()
    ctx!.closePath()

    // Update position
    particle.x += particle.vx
    particle.y += particle.vy

    // Check boundaries and reset to original position if too far
    const maxDistance = 50
    const dx = particle.x - particle.originalX
    const dy = particle.y - particle.originalY
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance > maxDistance) {
      particle.x = particle.originalX
      particle.y = particle.originalY
    }

    // Wrap around screen edges
    if (particle.x < 0) particle.x = canvasRef.value!.width
    if (particle.x > canvasRef.value!.width) particle.x = 0
    if (particle.y < 0) particle.y = canvasRef.value!.height
    if (particle.y > canvasRef.value!.height) particle.y = 0
  })
}

function animate() {
  drawParticles()
  animationFrameId = requestAnimationFrame(animate)
}

function handleResize() {
  if (!canvasRef.value) return
  
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
  createParticles()
}

onMounted(() => {
  if (!canvasRef.value) return
  
  ctx = canvasRef.value.getContext('2d')
  handleResize()
  animate()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 w-full h-full opacity-50"
  />
</template>