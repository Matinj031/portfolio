<template>
  <div class="scene-container">
    <canvas ref="canvas" class="scene-canvas" />
    <div class="gradient-overlay" :class="currentSection" />
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

// Props and emits
const props = defineProps<{
  currentSection: string
}>()

const emit = defineEmits<{
  ready: []
  sceneReady: []
}>()

// Scene setup
const canvas = ref<HTMLCanvasElement | null>(null)
const noise3D = createNoise3D()
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let clock: THREE.Clock
let particleSystem: ParticleSystem

interface Particle {
  position: THREE.Vector3
  basePosition: THREE.Vector3
  velocity: THREE.Vector3
  target: THREE.Vector3
}

class ParticleSystem {
  private particles: Particle[] = []
  private geometry: THREE.BufferGeometry
  private material: THREE.ShaderMaterial
  public points: THREE.Points
  private particleCount: number
  private time: number = 0

  constructor(scene: THREE.Scene) {
    this.particleCount = 2000
    
    // Create geometry
    this.geometry = new THREE.BufferGeometry()

    // Initialize buffers
    const positions = new Float32Array(this.particleCount * 3)
    const colors = new Float32Array(this.particleCount * 3)

    // Initialize particles and set colors
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3
      const particle = {
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ),
        basePosition: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        target: new THREE.Vector3()
      }
      this.particles.push(particle)

      // Set initial positions
      positions[i3] = particle.position.x
      positions[i3 + 1] = particle.position.y
      positions[i3 + 2] = particle.position.z

      // Enhanced color palette
      const hue = i / this.particleCount
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    // Set geometry attributes
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Create material with enhanced shader programs
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uVelocity: { value: 0.0 },
        uShape: { value: 0.0 },
        uSize: { value: 6.0 }, // Increased base size
        uProgress: { value: 0.0 }
      },
      vertexShader: `
        precision highp float;
        
        uniform float uTime;
        uniform float uVelocity;
        uniform float uSize;
        uniform float uProgress;
        uniform vec2 uMouse;
        
        varying vec3 vColor;
        varying vec2 vUv;
        varying float vDistance;
        varying float vProgress;

        vec3 mod289(vec3 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec4 mod289(vec4 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec4 permute(vec4 x) {
          return mod289(((x*34.0)+1.0)*x);
        }

        vec4 taylorInvSqrt(vec4 r) {
          return 1.79284291400159 - 0.85373472095314 * r;
        }

        float snoise(vec3 v) { 
          const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
          const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

          vec3 i  = floor(v + dot(v, C.yyy) );
          vec3 x0 =   v - i + dot(i, C.xxx) ;

          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );

          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;

          i = mod289(i); 
          vec4 p = permute( permute( permute( 
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

          float n_ = 0.142857142857;
          vec3  ns = n_ * D.wyz - D.xzx;

          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_ );

          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);

          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );

          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));

          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);

          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;

          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                        dot(p2,x2), dot(p3,x3) ) );
        }

        void main() {
          vColor = color;
          vUv = uv;
          
          vec3 pos = position;
          float noiseFreq = 2.0;
          float noiseAmp = 0.4;
          vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y * noiseFreq + uTime, pos.z * noiseFreq + uTime);
          vec3 noiseVec = vec3(snoise(noisePos));
          
          float angle = atan(pos.x, pos.z) + uTime * (0.1 + uVelocity * 0.2);
          float radius = length(pos.xz);
          float verticalOffset = snoise(vec3(radius * 2.0, angle * 2.0, uTime * 0.5)) * 0.5;
          
          pos.xz = vec2(
            sin(angle) * radius,
            cos(angle) * radius
          );
          
          pos += noiseVec * noiseAmp * (1.0 + uVelocity);
          pos.y += verticalOffset + sin(uTime + length(pos.xz)) * 0.2;
          
          vec2 mousePos = uMouse * 2.0 - 1.0;
          vec2 toMouse = pos.xz - mousePos;
          float distanceToMouse = length(toMouse);
          float mouseInfluence = smoothstep(2.0, 0.0, distanceToMouse);
          pos.xz += normalize(toMouse) * mouseInfluence * (0.5 + uVelocity);
          
          vec3 morphedPosition = mix(position, pos, uProgress);
          vec4 mvPosition = modelViewMatrix * vec4(morphedPosition, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Enhanced point size calculation
          float size = uSize;
          size *= (1.0 + sin(uTime * 2.0 + length(pos)) * 0.3);
          size *= (1.0 + mouseInfluence * 2.0);
          size *= smoothstep(20.0, 0.0, -mvPosition.z) * 1.5;
          size *= (1.0 - length(pos) * 0.05);
          gl_PointSize = size;
          
          vDistance = length(pos);
          vProgress = uProgress;
        }
      `,
      fragmentShader: `
        precision highp float;
        
        uniform float uTime;
        
        varying vec3 vColor;
        varying vec2 vUv;
        varying float vDistance;
        varying float vProgress;

        void main() {
          vec2 cxy = 2.0 * gl_PointCoord - 1.0;
          float r = dot(cxy, cxy);
          float delta = fwidth(r);
          
          // Softer particle edge
          float circle = 1.0 - smoothstep(0.8 - delta * 2.0, 0.8 + delta * 2.0, r);
          
          // Enhanced base color
          vec3 color = vColor * 1.5; // Increased brightness
          color += sin(vDistance * 2.0 + uTime) * 0.2;
          color += cos(vDistance * 3.0 - uTime * 2.0) * 0.1;
          
          // Stronger rim lighting
          float rim = 1.0 - smoothstep(0.5, 0.8, r);
          vec3 rimColor = vec3(0.9, 0.95, 1.0);
          color = mix(color, rimColor, rim * 0.8);
          
          // Enhanced glow effect
          float glow = exp(-r * 1.5) * (0.5 + 0.3 * sin(uTime * 3.0));
          color += glow * vec3(0.7, 0.9, 1.0);
          
          // Transition effect with extra glow
          float transitionGlow = sin(vDistance * 5.0 - uTime * 2.0) * 0.5 + 0.5;
          color = mix(color, color * (1.0 + transitionGlow * 0.8), vProgress);
          
          // Ensure colors stay vibrant
          color = clamp(color, 0.0, 1.0);
          
          // Enhanced alpha for better visibility
          float alpha = circle * (1.0 - r * 0.3) * 1.2;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    })

    // Create points and add to scene
    this.points = new THREE.Points(this.geometry, this.material)
    scene.add(this.points)
  }

  morphTo(shape: 'sphere' | 'grid' | 'helix' | 'random') {
    const positions = this.geometry.attributes.position.array as Float32Array
    
    this.particles.forEach((particle, i) => {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      const radius = 5
      
      switch (shape) {
        case 'sphere': {
          particle.target.x = radius * Math.sin(phi) * Math.cos(theta)
          particle.target.y = radius * Math.sin(phi) * Math.sin(theta)
          particle.target.z = radius * Math.cos(phi)
          break
        }
        case 'grid': {
          const size = Math.ceil(Math.sqrt(this.particleCount))
          const spacing = 10 / size
          const offsetX = -(spacing * size) / 2
          const offsetY = -(spacing * size) / 2
          const x = (i % size) * spacing + offsetX
          const y = Math.floor(i / size) * spacing + offsetY
          particle.target.set(x, y, 0)
          break
        }
        case 'helix': {
          const progress = i / this.particleCount
          const angle = progress * Math.PI * 10
          const radiusHelix = 5
          particle.target.x = Math.cos(angle) * radiusHelix
          particle.target.y = progress * 10 - 5
          particle.target.z = Math.sin(angle) * radiusHelix
          break
        }
        case 'random': {
          const radius = 5 + Math.random() * 5
          particle.target.x = (Math.random() - 0.5) * radius
          particle.target.y = (Math.random() - 0.5) * radius
          particle.target.z = (Math.random() - 0.5) * radius
          break
        }
      }
      
      // Store base position for noise calculations
      particle.basePosition.copy(particle.target)
    })
  }

  update(deltaTime: number) {
    this.time += deltaTime

    const positions = this.geometry.attributes.position.array as Float32Array
    const colors = this.geometry.attributes.color.array as Float32Array

    // Update particles
    this.particles.forEach((particle, i) => {
      const i3 = i * 3

      // Add some noise-based movement
      const noise = noise3D(
        particle.basePosition.x * 0.1 + this.time * 0.1,
        particle.basePosition.y * 0.1 + this.time * 0.1,
        particle.basePosition.z * 0.1
      ) * 0.1

      particle.position.lerp(particle.target, 0.05)
      particle.position.x += noise
      particle.position.y += noise
      particle.position.z += noise

      positions[i3] = particle.position.x
      positions[i3 + 1] = particle.position.y
      positions[i3 + 2] = particle.position.z

      // Animate colors
      const colorPhase = (Math.sin(this.time + i * 0.1) + 1) * 0.5
      colors[i3] = 0.25 + colorPhase * 0.1      // R
      colors[i3 + 1] = 1.0                      // G
      colors[i3 + 2] = 1.0                      // B
    })

    this.geometry.attributes.position.needsUpdate = true
    this.geometry.attributes.color.needsUpdate = true
    
    if (this.material.uniforms && this.material.uniforms.uTime) {
      this.material.uniforms.uTime.value = this.time
    }
  }

  dispose() {
    if (this.geometry) this.geometry.dispose()
    if (this.material) this.material.dispose()
  }
}

// Mouse interaction
const mouse = new THREE.Vector2()
const mouseVelocity = new THREE.Vector2()
const lastMousePosition = new THREE.Vector2()
const targetVelocity = ref(0)
const currentVelocity = ref(0)
const morphProgress = ref(0)

const updateMousePosition = (event: MouseEvent) => {
  if (!camera || !renderer) return
  
  // Store last position for velocity calculation
  lastMousePosition.copy(mouse)
  
  // Update current mouse position
  mouse.x = (event.clientX / window.innerWidth)
  mouse.y = 1 - (event.clientY / window.innerHeight)
  
  // Calculate velocity
  mouseVelocity.subVectors(mouse, lastMousePosition)
  targetVelocity.value = Math.min(1.0, mouseVelocity.length() * 20.0)
}

const onMouseMove = (event: MouseEvent) => {
  updateMousePosition(event)
  
  // Update shader uniforms
  if (particleSystem?.material?.uniforms) {
    particleSystem.material.uniforms.uMouse.value.copy(mouse)
  }
}

const onMouseLeave = () => {
  targetVelocity.value = 0
}

// Update particle system state
const updateParticleSystem = () => {
  if (!particleSystem?.material?.uniforms) return
  
  // Smooth velocity transition
  const velocityDelta = targetVelocity.value - currentVelocity.value
  currentVelocity.value += velocityDelta * 0.1
  
  // Update uniforms
  particleSystem.material.uniforms.uVelocity.value = currentVelocity.value
  particleSystem.material.uniforms.uProgress.value = morphProgress.value
}

// Initialize scene
const initScene = () => {
  if (!canvas.value) return

  scene = new THREE.Scene()
  
  // Camera setup
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 10
  
  // Renderer setup
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    antialias: true,
    alpha: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  
  // Clock for animation
  clock = new THREE.Clock()

  // Create particle system
  particleSystem = new ParticleSystem(scene)
  
  // Initial shape
  particleSystem.morphTo('sphere')
}

// Animation loop
const animate = () => {
  if (!scene || !camera || !renderer || !particleSystem) return
  
  const delta = clock.getDelta()
  particleSystem.update(delta)
  updateParticleSystem()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

// Shape morphing
const morphTo = (shape: string) => {
  if (!particleSystem) return
  
  // Start transition
  gsap.to(morphProgress, {
    value: 0,
    duration: 0.5,
    ease: 'power2.out',
    onComplete: () => {
      particleSystem.morphTo(shape)
      gsap.to(morphProgress, {
        value: 1,
        duration: 1,
        ease: 'power2.inOut'
      })
    }
  })
}

// Handle window resize
const onResize = () => {
  if (!camera || !renderer) return
  
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// Watch for section changes
watch(() => props.currentSection, (newSection) => {
  if (!particleSystem) return
  
  switch (newSection) {
    case 'hero':
      morphTo('sphere')
      break
    case 'about':
      morphTo('grid')
      break
    case 'projects':
      morphTo('helix')
      break
    case 'contact':
      morphTo('random')
      break
  }
})

// Lifecycle hooks
onMounted(() => {
  initScene()
  window.addEventListener('resize', onResize)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseleave', onMouseLeave)
  animate()
  emit('ready')
  emit('sceneReady')
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseleave', onMouseLeave)
  if (particleSystem) {
    particleSystem.dispose()
  }
  if (renderer) {
    renderer.dispose()
  }
  if (scene) {
    scene.clear()
  }
})
</script>

<style scoped>
.scene-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.scene-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background 1s ease;
}

.gradient-overlay.hero {
  background: radial-gradient(circle at center, transparent 0%, rgba(0, 22, 22, 0.8) 100%);
}

.gradient-overlay.projects,
.gradient-overlay.skills,
.gradient-overlay.contact {
  background: radial-gradient(circle at center, transparent 0%, rgba(0, 22, 22, 0.95) 100%);
}
</style>