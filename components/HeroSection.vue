<script setup lang="ts">
import * as THREE from 'three'
import { ref, onMounted, onBeforeUnmount, createApp } from 'vue'
import VueIcon from './icons/VueIcon.vue'
import NuxtIcon from './icons/NuxtIcon.vue'
import TypeScriptIcon from './icons/TypeScriptIcon.vue'
import ParticlesBackground from './ParticlesBackground.vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let icons: THREE.Mesh[] = []
let animationFrameId: number

// Create SVG textures from components
function createSVGTexture(component: any) {
  const div = document.createElement('div')
  const app = createApp(component)
  app.mount(div)
  
  const svg = div.querySelector('svg')
  const svgString = new XMLSerializer().serializeToString(svg!)
  const blob = new Blob([svgString], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  
  return url
}

const technologies = [
  { name: 'Vue.js', component: VueIcon, position: new THREE.Vector3(-2, 0, 0) },
  { name: 'Nuxt.js', component: NuxtIcon, position: new THREE.Vector3(2, 0, 0) },
  { name: 'TypeScript', component: TypeScriptIcon, position: new THREE.Vector3(0, 2, 0) },
]

function init() {
  if (!canvasRef.value) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: true,
  })
  
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.position.z = 5

  // Create floating icons using SVG components
  technologies.forEach(tech => {
    const geometry = new THREE.PlaneGeometry(1, 1)
    const textureLoader = new THREE.TextureLoader()
    const svgUrl = createSVGTexture(tech.component)
    const texture = textureLoader.load(svgUrl)
    
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    })
    
    const icon = new THREE.Mesh(geometry, material)
    icon.position.copy(tech.position)
    scene.add(icon)
    icons.push(icon)

    // Clean up URL after texture is loaded
    texture.onUpdate = () => URL.revokeObjectURL(svgUrl)
  })

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
}

function animate() {
  animationFrameId = requestAnimationFrame(animate)

  // Animate icons
  icons.forEach((icon, index) => {
    icon.rotation.z += 0.002
    icon.position.y = Math.sin(Date.now() * 0.001 + index) * 0.2
  })

  renderer.render(scene, camera)
}

function handleMouseMove(event: MouseEvent) {
  if (!camera) return

  const mouseX = (event.clientX / window.innerWidth) * 2 - 1
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

  camera.position.x = mouseX * 0.5
  camera.position.y = mouseY * 0.5
  camera.lookAt(scene.position)
}

function handleResize() {
  if (!camera || !renderer || !canvasRef.value) return

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  init()
  animate()
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden dark:bg-gray-900">
    <ParticlesBackground />
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" />
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
      <h1 class="text-6xl md:text-8xl font-bold mb-4 text-white hero-title">
        Matin Jahi
      </h1>
      <p class="text-xl md:text-2xl text-white/90 hero-subtitle">
        Full Stack Developer
      </p>
    </div>
  </div>
</template>

<style>
.hero-title {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}
</style>