<template>
  <div class="min-h-screen bg-[#001616] text-white relative">
    <!-- Background particle system -->
    <ThreeScene :is-experience-mode="false" :current-section="currentSection" @ready="sceneReady = true" />
    
    <!-- Main content -->
    <main class="relative z-10">
      <!-- Hero Section -->
      <section ref="heroSection" id="hero" class="min-h-screen flex items-center px-8">
        <div class="container mx-auto">
          <h1 class="text-7xl font-bold mb-4">
            <span class="text-[#42ffff]">Creative</span><br />
            Portfolio
          </h1>
          <p class="text-xl mb-8 max-w-2xl">
            Showcasing innovative designs and creative solutions through immersive 3D experiences
          </p>
          <button @click="scrollToSection('projects')" class="bg-[#42ffff] text-[#001616] px-8 py-3 rounded-full font-semibold hover:bg-opacity-80 transition-all">
            Explore Work →
          </button>
        </div>
      </section>

      <!-- Projects Section -->
      <section ref="projectsSection" id="projects" class="min-h-screen py-32 px-8">
        <div class="container mx-auto">
          <h2 class="text-4xl font-bold mb-12">Latest <span class="text-[#42ffff]">Projects</span></h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ThreedCardContainer>
            <ThreedCardBody
                class="bg-white
                 relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:!bg-slate-800 dark:border-white/[0.2] border-black/[0.1] w-full max-w-fit h-auto rounded-xl p-6 border"
            >
                <ThreedCardItem :translate-z="50" class="text-xl font-bold text-neutral-600 dark:text-white">
                    Pateh
                </ThreedCardItem>
                <ThreedCardItem
                    as="p"
                    :translate-z="60"
                    class="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                    travel agencies for flights, hotels, and car rentals
                </ThreedCardItem>
                <ThreedCardItem :translate-z="100" class="w-full mt-4">
                    <NuxtImg
                        src="images/pateh.png"
                        class="h-60 w-full object-cover rounded-xl"
                        alt="Pateh"
                    />
                </ThreedCardItem>
                <div
                    class="flex justify-center
                  items-center mt-20"
                >
                    <a style="text-decoration: underline; text-underline-offset: 5px" href="https://www.pateh.com" target="_blank">
                        visit website
                    </a>
                </div>
            </ThreedCardBody>
        </ThreedCardContainer>

        <ThreedCardContainer>
            <ThreedCardBody
                class="bg-white
                 relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:!bg-slate-800 dark:border-white/[0.2] border-black/[0.1] w-full max-w-fit h-auto rounded-xl p-6 border"
            >
                <ThreedCardItem :translate-z="50" class="text-xl font-bold text-neutral-600 dark:text-white">
                    TeamChem
                </ThreedCardItem>
                <ThreedCardItem
                    as="p"
                    :translate-z="60"
                    class="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                    Drilling Fluids Additives & Specialty Chemicals
                </ThreedCardItem>
                <ThreedCardItem :translate-z="100" class="w-full mt-4">
                    <NuxtImg
                        src="images/teamchem.png"
                        class="h-60 w-full object-cover rounded-xl"
                        alt="Pateh"
                    />
                </ThreedCardItem>
                <div
                    class="flex justify-center
                  items-center mt-20"
                >
                    <a style="text-decoration: underline; text-underline-offset: 5px" href="https://www.teamchem.co/" target="_blank">
                        visit website
                    </a>
                </div>
            </ThreedCardBody>
        </ThreedCardContainer>
        <ThreedCardContainer>
            <ThreedCardBody
                class="bg-white
                 relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:!bg-[#002424] dark:border-white/[0.2] border-black/[0.1] w-full max-w-fit h-auto rounded-xl p-6 border"
            >
                <ThreedCardItem :translate-z="50" class="text-xl font-bold text-neutral-600 dark:text-white">
                    Discord voice assistant bot
                </ThreedCardItem>
                <ThreedCardItem
                    as="p"
                    :translate-z="60"
                    class="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                    A voice assistant bot for discord servers to help users with their daily tasks  and provide them with information
                </ThreedCardItem>
                <ThreedCardItem :translate-z="100" class="w-full mt-4">
                    <NuxtImg
                        src="images/voice-assistant.png"
                        class="h-60 w-full object-cover rounded-xl"
                        alt="Pateh"
                    />
                </ThreedCardItem>
                <div
                    class="flex justify-center
                  items-center mt-20"
                >
                    <a style="text-decoration: underline; text-underline-offset: 5px" href="https://voice-assistant.bot/" target="_blank">
                        visit website
                    </a>
                </div>
            </ThreedCardBody>
        </ThreedCardContainer>
    </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section ref="skillsSection" id="skills" class="min-h-screen py-32 px-8">
        <div class="container mx-auto">
          <h2 class="text-4xl font-bold mb-12">Skills & <span class="text-[#42ffff]">Expertise</span></h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="skill in skills" :key="skill.id" 
                 class="skill-card p-6 bg-[#002424] rounded-xl hover:bg-[#003434] transition-colors">
              <div class="text-[#42ffff] text-4xl mb-4">
                <component :is="skill.icon" />
              </div>
              <h3 class="text-xl font-semibold mb-2">{{ skill.title }}</h3>
              <p class="text-gray-400">{{ skill.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section ref="contactSection" id="contact" class="min-h-screen py-32 px-8">
        <div class="container mx-auto">
          <h2 class="text-4xl font-bold mb-12">Let's <span class="text-[#42ffff]">Connect</span></h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="contact-form bg-[#002424] p-8 rounded-xl">
              <form @submit.prevent="submitForm">
                <div class="mb-6">
                  <input type="text" v-model="form.name" placeholder="Name" 
                         class="w-full bg-[#001616] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#42ffff]">
                </div>
                <div class="mb-6">
                  <input type="email" v-model="form.email" placeholder="Email" 
                         class="w-full bg-[#001616] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#42ffff]">
                </div>
                <div class="mb-6">
                  <textarea v-model="form.message" placeholder="Message" rows="4"
                          class="w-full bg-[#001616] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#42ffff]"></textarea>
                </div>
                <button type="submit" 
                        class="bg-[#42ffff] text-[#001616] px-8 py-3 rounded-full font-semibold hover:bg-opacity-80 transition-all">
                  Send Message
                </button>
              </form>
            </div>
            <div class="social-links">
              <h3 class="text-2xl font-semibold mb-6">Connect on Social Media</h3>
              <div class="flex space-x-6">
                <a v-for="social in socials" :key="social.id" :href="social.link"
                   class="text-[#42ffff] hover:text-white transition-colors">
                  <component :is="social.icon" class="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

// State
const currentSection = ref('hero')
const sceneReady = ref(false)
const form = ref({
  name: '',
  email: '',
  message: ''
})

// Section refs
const heroSection = ref<HTMLElement | null>(null)
const projectsSection = ref<HTMLElement | null>(null)
const skillsSection = ref<HTMLElement | null>(null)
const contactSection = ref<HTMLElement | null>(null)

// Sample data
const projects = [
  {
    id: 1,
    title: 'Project One',
    description: 'A modern web application with 3D interactions',
    image: '/images/voice-assistant.png',
    link: '#'
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'Interactive 3D visualization platform',
    image: '/images/pateh.png',
    link: '#'
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'Immersive user experience design',
    image: '/images/teamChem.png',
    link: '#'
  }
]

const skills = [
  {
    id: 1,
    title: '3D Modeling',
    description: 'Expert in creating 3D models and environments.',
    icon: 'i-carbon-3d-cursor'
  },
  {
    id: 2,
    title: 'Motion Design',
    description: 'Creating fluid and dynamic animations.',
    icon: 'i-carbon-movement'
  },
  {
    id: 3,
    title: 'Web Development',
    description: 'Building modern web applications.',
    icon: 'i-carbon-code'
  }
]

const socials = [
  {
    id: 1,
    icon: 'i-carbon-logo-github',
    link: 'https://github.com'
  },
  {
    id: 2,
    icon: 'i-carbon-logo-linkedin',
    link: 'https://linkedin.com'
  },
  {
    id: 3,
    icon: 'i-carbon-logo-twitter',
    link: 'https://twitter.com'
  }
]

// Intersection observer setup
const observerOptions = {
  threshold: 0.5
}

onMounted(() => {
  const sections = [
    { ref: heroSection, name: 'hero' },
    { ref: projectsSection, name: 'projects' },
    { ref: skillsSection, name: 'skills' },
    { ref: contactSection, name: 'contact' }
  ]

  sections.forEach(({ ref, name }) => {
    useIntersectionObserver(ref, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        currentSection.value = name
      }
    }, observerOptions)
  })
})

// Methods
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const submitForm = () => {
  // Handle form submission
  console.log('Form submitted:', form.value)
}
</script>

<style>
.project-card {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.skill-card {
  backdrop-filter: blur(10px);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Hide scrollbar but keep functionality */
body {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

body::-webkit-scrollbar {
  display: none;
}
</style>
