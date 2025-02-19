<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { gsap } from 'gsap'
import { createNoise3D } from 'simplex-noise'
import { AnimationMixer } from 'three'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isInitialized = ref(false)
let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let geometry: THREE.BufferGeometry
let material: THREE.ShaderMaterial
let points: THREE.Points
let noise3D = createNoise3D()
let frame = 0
let isAnimating = true
let mouse = { x: 0, y: 0 }
let targetRotation = { x: 0, y: 0 }
let currentRotation = { x: 0, y: 0 }

// Section tracking
const currentSection = ref(0)
const sections = ref<HTMLElement[]>([])
const sectionProgress = ref(0)

// Model morphing states
let modelPositions: { [key: string]: number[] } = {}
const modelPaths = [
  '/models/stylized_crystal.glb',
  '/models/tree.glb',
  '/models/oni.glb',
  '/models/horse.glb',
  '/models/boy.glb'
]

// Add animation state variables
let mixer: THREE.AnimationMixer | null = null
let horseAnimation: THREE.AnimationAction | null = null
let horseModel: THREE.Object3D | null = null

const vertexShader = `
  attribute float size;
  attribute vec3 customColor;
  attribute vec3 targetPosition;
  uniform float uTime;
  uniform float uMorph;
  uniform float uNoise;
  varying vec3 vColor;

  //
  // GLSL textureless classic 3D noise "cnoise",
  // with an RSL-style periodic variant "pnoise".
  // Author:  Stefan Gustavson (stefan.gustavson@liu.se)
  // Version: 2011-10-11
  //
  // Many thanks to Ian McEwan of Ashima Arts for the
  // ideas for permutation and gradient selection.
  //
  // Copyright (c) 2011 Stefan Gustavson. All rights reserved.
  // Distributed under the MIT license. See LICENSE file.
  // https://github.com/ashima/webgl-noise
  //

  vec3 mod289(vec3 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 mod289(vec4 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 permute(vec4 x)
  {
    return mod289(((x*34.0)+1.0)*x);
  }

  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }

  // Classic Perlin noise
  float cnoise(vec3 P)
  {
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
  }

  void main() {
    vColor = customColor;
    
    // Apply noise displacement with reduced effect
    vec3 displaced = position;
    float noise = cnoise(vec3(position.x * 0.002 + uTime * 0.1, position.y * 0.002 + uTime * 0.2, position.z * 0.002));
    displaced += normal * noise * uNoise * 5.0;
    
    // Apply morphing with smooth transition
    vec3 morphed = mix(displaced, targetPosition, uMorph);
    vec4 mvPosition = modelViewMatrix * vec4(morphed, 1.0);
    
    // Dynamic point size with increased base size
    float sizeScale = size * (1.0 + sin(uTime * 0.5 + noise * 2.0) * 0.3);
    gl_PointSize = sizeScale * (800.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  varying vec3 vColor;
  uniform float uTime;

  void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = length(gl_PointCoord - center);
    float alpha = 1.0 - smoothstep(0.45, 0.5, dist);
    
    // Increased color intensity
    float pulse = 0.6 + 0.4 * sin(uTime * 0.5);
    vec3 finalColor = mix(vColor, vColor * 2.0, pulse);
    
    // Enhanced glow effect
    float glow = exp(-1.5 * dist);
    finalColor += vColor * glow * 0.8;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`

const PARTICLES_COUNT = 1000
let particles: THREE.Vector3[] = []
let positions: number[] = []
let targetPositions: number[] = []
let colors: number[] = []
let sizes: number[] = []

const createSpherePositions = (radius: number) => {
  const positions = []
  for (let i = 0; i < PARTICLES_COUNT; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)
    positions.push(x, y, z)
  }
  return positions
}

const createGridPositions = (size: number) => {
  const positions = []
  const halfSize = size / 2
  const spacing = size / Math.cbrt(PARTICLES_COUNT)
  
  for (let i = 0; i < PARTICLES_COUNT; i++) {
    const x = (Math.random() - 0.5) * size
    const y = (Math.random() - 0.5) * size
    const z = (Math.random() - 0.5) * size
    positions.push(x, y, z)
  }
  return positions
}

const loadModel = async (path: string): Promise<number[]> => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()
    loader.load(
      path,
      (gltf) => {
        try {
          const model = gltf.scene.children[0]
          const positions: number[] = []
          
          // Store horse model and setup animation
          if (path.includes('horse')) {
            horseModel = gltf.scene
            if (gltf.animations && gltf.animations.length > 0) {
              mixer = new AnimationMixer(gltf.scene)
              horseAnimation = mixer.clipAction(gltf.animations[0])
              horseAnimation.setLoop(THREE.LoopRepeat, Infinity)
              horseAnimation.clampWhenFinished = true
              horseAnimation.enable = true
            }
          }
          
          if (model instanceof THREE.Mesh) {
            const geometry = model.geometry
            const positionAttribute = geometry.getAttribute('position')
            
            // Sample vertices to match particle count
            const vertexCount = positionAttribute.count
            const stride = Math.max(1, Math.floor(vertexCount / PARTICLES_COUNT))
            
            // Calculate bounding box for scaling
            geometry.computeBoundingBox()
            const box = geometry.boundingBox
            const size = new THREE.Vector3()
            box.getSize(size)
            const maxDim = Math.max(size.x, size.y, size.z)
            const scale = 800 / maxDim
            
            for (let i = 0; i < PARTICLES_COUNT; i++) {
              const index = (i * stride) % vertexCount
              positions.push(
                positionAttribute.getX(index) * scale,
                positionAttribute.getY(index) * scale,
                positionAttribute.getZ(index) * scale
              )
            }
          } else {
            console.error('Model is not a mesh:', path)
            resolve(createSpherePositions(400))
          }
          
          resolve(positions)
        } catch (error) {
          console.error('Error processing model:', path, error)
          resolve(createSpherePositions(400))
        }
      },
      (progress) => {
        console.log(`Loading model ${path}: ${(progress.loaded / progress.total * 100).toFixed(2)}%`)
      },
      (error) => {
        console.error('Error loading model:', path, error)
        resolve(createSpherePositions(400))
      }
    )
  })
}

const updateModelBasedOnScroll = () => {
  if (!sections.value.length) return

  const scrollY = window.scrollY
  const windowHeight = window.innerHeight
  const totalHeight = document.documentElement.scrollHeight - windowHeight

  // Calculate overall scroll progress (0 to 1)
  const overallProgress = Math.min(1, Math.max(0, scrollY / totalHeight))

  // Find current section
  let currentSectionIndex = 0
  let accumulatedHeight = 0

  for (let i = 0; i < sections.value.length; i++) {
    const section = sections.value[i]
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionMiddle = sectionTop + sectionHeight / 2

    if (scrollY + windowHeight / 2 >= sectionTop) {
      currentSectionIndex = i
      const progress = (scrollY + windowHeight / 2 - sectionTop) / sectionHeight
      sectionProgress.value = Math.max(0, Math.min(1, progress))
    }
  }

  if (currentSection.value !== currentSectionIndex) {
    console.log('Morphing to model:', currentSectionIndex) // Debug log
    currentSection.value = currentSectionIndex
    morphToModel(currentSectionIndex)
  }

  // Update rotation based on scroll
  targetRotation.y = overallProgress * Math.PI * 4
}

const morphToModel = (modelIndex: number) => {
  const modelPath = modelPaths[modelIndex]
  if (!modelPositions[modelPath]) return

  const newTargetPositions = modelPositions[modelPath]
  const currentPositions = geometry.getAttribute('position').array
  
  // Update target positions
  geometry.setAttribute('targetPosition', new THREE.Float32BufferAttribute(newTargetPositions, 3))
  
  // Reset morph value
  material.uniforms.uMorph.value = 0
  
  // Handle horse animation
  if (modelPath.includes('horse') && horseAnimation) {
    horseAnimation.reset()
    horseAnimation.play()
  } else if (horseAnimation) {
    horseAnimation.stop()
  }
  
  // Animate morph
  gsap.to(material.uniforms.uMorph, {
    value: 1,
    duration: 2,
    ease: 'power2.inOut',
    onComplete: () => {
      // Update current positions to match target
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(newTargetPositions, 3))
      material.uniforms.uMorph.value = 0
    }
  })
}

const init = async () => {
  if (!canvasRef.value || isInitialized.value) return
  
  try {
    scene = new THREE.Scene()
    
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.54, 2000)
    camera.position.z = 1500
    camera.position.y = 0
    camera.lookAt(0, 0, 0)

    // Create initial sphere positions with larger radius
    positions = createSpherePositions(400)

    // Create particles
    geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('targetPosition', new THREE.Float32BufferAttribute(positions, 3))
    
    // Setup colors and sizes with larger particles
    for (let i = 0; i < PARTICLES_COUNT; i++) {
      const color = new THREE.Color()
      const hue = i / PARTICLES_COUNT
      color.setHSL(hue, 0.8, 0.6)
      colors.push(color.r, color.g, color.b)
      sizes.push(Math.random() * 6 + 3)
    }
    
    geometry.setAttribute('customColor', new THREE.Float32BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(new Array(PARTICLES_COUNT * 3).fill(0), 3))

    material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uNoise: { value: 10.0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    points = new THREE.Points(geometry, material)
    scene.add(points)

    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Load all models after scene setup
    console.log('Loading models...')
    for (const path of modelPaths) {
      try {
        console.log('Loading model:', path)
        const positions = await loadModel(path)
        modelPositions[path] = positions
        console.log('Model loaded:', path)
      } catch (error) {
        console.error('Error loading model:', path, error)
        modelPositions[path] = createSpherePositions(400) // Fallback to sphere if model loading fails
      }
    }

    isInitialized.value = true
    animate()

    // Initialize sections
    nextTick(() => {
      sections.value = Array.from(document.querySelectorAll('[data-section]'))
      console.log('Found sections:', sections.value.length)
      updateModelBasedOnScroll()
    })
  } catch (error) {
    console.error('Error initializing Three.js:', error)
  }
}

const animate = () => {
  if (!isAnimating) return
  requestAnimationFrame(animate)

  frame += 0.01
  material.uniforms.uTime.value = frame

  // Update animation mixer
  if (mixer) {
    mixer.update(0.016) // Update at 60fps
  }

  // Smooth rotation following mouse and scroll
  currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05
  currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05
  points.rotation.x = currentRotation.x
  points.rotation.y = currentRotation.y

  renderer.render(scene, camera)
}

const handleScroll = () => {
  if (!isInitialized.value) return
  requestAnimationFrame(() => {
    updateModelBasedOnScroll()
  })
}

const handleMouseMove = (event: MouseEvent) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  
  // Combine mouse and scroll rotation
  targetRotation.x = mouse.y * 0.5
}

const handleResize = () => {
  if (!canvasRef.value) return
  
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  updateModelBasedOnScroll()
}

onMounted(async () => {
  await nextTick()
  await init()
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  isAnimating = false
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('scroll', handleScroll)
  
  if (mixer) mixer.stopAllAction()
  if (geometry) geometry.dispose()
  if (material) material.dispose()
  if (renderer) renderer.dispose()
})
</script>

<template>
  <div class="fixed top-0 left-0  w-full h-full z-[4]">
    <canvas ref="canvasRef" />
  </div>
</template>

<style scoped>

</style> 