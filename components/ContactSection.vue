<template>
  <section  class="min-h-screen py-32 px-8 relative">
    <div class="container mx-auto">
      <h2 class="text-4xl font-bold mb-16">
        Let's <span class="text-[#42ffff]">Connect</span>
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div class="contact-form-container"
          :class="{ 'animate-slide-up-fade': isVisible }"
          style="animation-delay: 0ms;">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="form-group">
              <label for="name" class="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#42ffff] 
                      focus:ring-1 focus:ring-[#42ffff] transition-all outline-none"
                :class="{ 'animate-shake': formErrors.name }"
              />
            </div>

            <div class="form-group">
              <label for="email" class="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
                class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#42ffff]
                      focus:ring-1 focus:ring-[#42ffff] transition-all outline-none"
                :class="{ 'animate-shake': formErrors.email }"
              />
            </div>

            <div class="form-group">
              <label for="message" class="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="6"
                class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#42ffff]
                      focus:ring-1 focus:ring-[#42ffff] transition-all outline-none resize-none"
                :class="{ 'animate-shake': formErrors.message }"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="group relative w-full px-8 py-3 rounded-lg font-semibold overflow-hidden
                    bg-[#42ffff] text-[#001616] hover:bg-opacity-90 transition-all disabled:opacity-50"
            >
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </span>
            </button>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="contact-info-container"
          :class="{ 'animate-slide-up-fade': isVisible }"
          style="animation-delay: 200ms;">
          <div class="space-y-8">
            <div class="contact-item group">
              <h3 class="text-xl font-semibold mb-4 text-[#42ffff]">Location</h3>
              <p class="text-gray-300 group-hover:text-white transition-colors">
                Tehran, Iran
              </p>
            </div>

            <div class="contact-item group">
              <h3 class="text-xl font-semibold mb-4 text-[#42ffff]">Email</h3>
              <a href="mailto:your.email@example.com" 
                class="text-gray-300 group-hover:text-white transition-colors">
                your.email@example.com
              </a>
            </div>

            <div class="contact-item group">
              <h3 class="text-xl font-semibold mb-4 text-[#42ffff]">Social</h3>
              <div class="flex space-x-4">
                <a v-for="social in socials" 
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  class="p-3 rounded-full bg-white/5 hover:bg-[#42ffff]/10 transition-all
                        group/icon "
                >
                  <img :src="social.icon" :alt="social.name" class=" w-6 h-6 group-hover/icon:text-[#42ffff] transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

const isVisible = ref(false)
const sectionRef = ref(null)
const isSubmitting = ref(false)

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const formErrors = reactive({
  name: false,
  email: false,
  message: false
})

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

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: '/icons/github.svg'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: '/icons/linkedin.svg'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: '/icons/x.svg'
  }
]

const handleSubmit = async () => {
  // Reset errors
  // Object.keys(formErrors).forEach(key => formErrors[key] = false)
  
  // Validate
  let hasError = false
  if (!form.name.trim()) {
    formErrors.name = true
    hasError = true
  }
  if (!form.email.trim() || !form.email.includes('@')) {
    formErrors.email = true
    hasError = true
  }
  if (!form.message.trim()) {
    formErrors.message = true
    hasError = true
  }

  if (hasError) return

  isSubmitting.value = true

  // try {
  //   // Replace with your actual API endpoint
  //   await fetch('/api/contact', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(form)
  //   })

  //   // Reset form
  //   form.name = ''
  //   form.email = ''
  //   form.message = ''

  //   // Show success message
  //   alert('Message sent successfully!')
  // } catch (error) {
  //   console.error('Error sending message:', error)
  //   alert('Failed to send message. Please try again.')
  // } finally {
  //   isSubmitting.value = false
  // }
}
</script>

<style scoped>
.contact-item {
  @apply p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all;
}

.animate-shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.form-group input,
.form-group textarea {
  @apply bg-transparent text-white placeholder-gray-400;
}

.form-group input:focus,
.form-group textarea:focus {
  @apply bg-white/5;
}
</style>
