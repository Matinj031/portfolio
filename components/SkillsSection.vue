<template>
  <section class="py-32 px-8 relative" id="skills">
    <div class="container mx-auto">
      <h2 class="text-4xl font-bold mb-16">
        Technical <span class="text-[#42ffff]">Skills</span>
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Frontend Skills -->
        <div class="skill-category" 
          :class="{ 'animate-slide-up-fade': isVisible }"
          style="animation-delay: 0ms;">
          <h3 class="text-xl font-semibold mb-6 text-[#42ffff]">Frontend Development</h3>
          <div class="space-y-4">
            <div v-for="skill in frontendSkills" :key="skill.name" class="skill-item">
              <div class="flex justify-between mb-2">
                <span>{{ skill.name }}</span>
                <span class="text-[#42ffff]">{{ skill.level }}%</span>
              </div>
              <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-[#42ffff] transition-all duration-1000 ease-out"
                  :style="{ width: isVisible ? `${skill.level}%` : '0%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Backend Skills -->
        <div class="skill-category"
          :class="{ 'animate-slide-up-fade': isVisible }"
          style="animation-delay: 200ms;">
          <h3 class="text-xl font-semibold mb-6 text-[#42ffff]">Backend Development</h3>
          <div class="space-y-4">
            <div v-for="skill in backendSkills" :key="skill.name" class="skill-item">
              <div class="flex justify-between mb-2">
                <span>{{ skill.name }}</span>
                <span class="text-[#42ffff]">{{ skill.level }}%</span>
              </div>
              <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-[#42ffff] transition-all duration-1000 ease-out"
                  :style="{ width: isVisible ? `${skill.level}%` : '0%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tools & Technologies -->
        <div class="skill-category"
          :class="{ 'animate-slide-up-fade': isVisible }"
          style="animation-delay: 400ms;">
          <h3 class="text-xl font-semibold mb-6 text-[#42ffff]">Tools & Technologies</h3>
          <div class="space-y-4">
            <div v-for="skill in toolsSkills" :key="skill.name" class="skill-item">
              <div class="flex justify-between mb-2">
                <span>{{ skill.name }}</span>
                <span class="text-[#42ffff]">{{ skill.level }}%</span>
              </div>
              <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-[#42ffff] transition-all duration-1000 ease-out"
                  :style="{ width: isVisible ? `${skill.level}%` : '0%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Technologies Cloud -->
      <div class="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        :class="{ 'animate-fade-in': isVisible }"
        style="animation-delay: 600ms;">
        <div v-for="tech in technologies" :key="tech.name"
          class="tech-item p-4 rounded-lg bg-white/5 hover:bg-[#42ffff]/10 transition-all
                flex flex-col items-center justify-center gap-2 group cursor-pointer">
          <!-- <img :src="tech.icon" :alt="tech.name" class="w-12 h-12 group-hover:scale-110 transition-transform" /> -->
          <span class="text-sm text-gray-300 group-hover:text-[#42ffff]">{{ tech.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

const isVisible = ref(false)
const sectionRef = ref(null)

// Intersection observer setup
onMounted(() => {
  const { stop } = useIntersectionObserver(
    sectionRef,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isVisible.value = true
        stop()
      }
    },
    { threshold: 0.2 }
  )
})

const frontendSkills = [
  { name: 'Vue.js', level: 95 },
  { name: 'React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Three.js/WebGL', level: 80 },
  { name: 'CSS/SCSS', level: 90 }
]

const backendSkills = [
  { name: 'Node.js', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'GraphQL', level: 75 },
  { name: 'MongoDB', level: 85 },
  { name: 'PostgreSQL', level: 80 }
]

const toolsSkills = [
  { name: 'Git/GitHub', level: 90 },
  { name: 'Docker', level: 85 },
  { name: 'AWS', level: 75 },
  { name: 'CI/CD', level: 80 },
  { name: 'Testing', level: 85 }
]

const technologies = [
  { name: 'Vue.js', icon: '/icons/vue.svg' },
  { name: 'React', icon: '/icons/react.svg' },
  { name: 'Node.js', icon: '/icons/nodejs.svg' },
  { name: 'TypeScript', icon: '/icons/typescript.svg' },
  { name: 'Three.js', icon: '/icons/threejs.svg' },
  { name: 'Python', icon: '/icons/python.svg' },
  { name: 'Docker', icon: '/icons/docker.svg' },
  { name: 'AWS', icon: '/icons/aws.svg' },
  { name: 'MongoDB', icon: '/icons/mongodb.svg' },
  { name: 'PostgreSQL', icon: '/icons/postgresql.svg' },
  { name: 'GraphQL', icon: '/icons/graphql.svg' },
  { name: 'Git', icon: '/icons/git.svg' }
]
</script>

<style scoped lang="scss">
.skill-category {
  @apply p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all;
}

.skill-item {
  @apply relative;
}

.tech-item {
  transform: translateY(20px);
  opacity: 0;
  animation: slide-up-fade 0.5s forwards;
}

@for $i from 1 through 12 {
  .tech-item:nth-child(#{$i}) {
    animation-delay: #{$i * 100}ms;
  }
}
</style>
