<template>
  <main class="relative min-h-screen overflow-hidden bg-black">
    <!-- Three.js Canvas (client-only) -->
    <ClientOnly>
      <div ref="canvasContainer" class="absolute inset-0"></div>
    </ClientOnly>


    <!-- Gradient Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none"
    ></div>

    <!-- Content -->
    <div
      class="relative z-10 min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div class="w-full max-w-7xl">
        <!-- Title -->
        <Motion
          :initial="isMounted ? { opacity: 0, y: 50 } : false"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 1 }"
          class="text-center mb-20"
        >

          <div
            class="inline-block mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-xl"
          >
            <span class="text-purple-300 text-sm font-semibold"
              >✨ Available for Projects</span
            >
          </div>
          <h1
            class="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
          >
            Get In Touch
          </h1>
          <p class="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            Have an exciting project? Let's create something extraordinary
            together
          </p>
        </Motion>

        <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-16">
          <!-- Contact Cards -->
          <div class="lg:col-span-5 space-y-6">
            <Motion
              v-for="(contact, index) in contacts"
              :key="contact.label"
              :initial="isMounted ? { opacity: 0, x: -100 } : false"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{ duration: 0.8, delay: 0.2 + index * 0.1 }"
            >

              <a
                :href="contact.href"
                :target="contact.external ? '_blank' : undefined"
                class="contact-card group block relative"
              >
                <div
                  class="absolute -inset-0.5 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 rounded-3xl"
                  :style="{ background: contact.gradient }"
                ></div>
                <div
                  class="relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-gray-700/50 backdrop-blur-2xl overflow-hidden"
                >
                  <div
                    class="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl rounded-full"
                    :style="{ background: contact.gradient }"
                  ></div>
                  <div class="relative flex items-center gap-5">
                    <div
                      class="icon-container group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                      :style="{ background: contact.iconBg }"
                    >
                      <div v-html="contact.icon" class="icon-svg"></div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p
                        class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2"
                      >
                        {{ contact.label }}
                      </p>
                      <p class="text-lg font-bold text-white truncate">
                        {{ contact.value }}
                      </p>
                    </div>
                    <div
                      class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-content-center group-hover:bg-white/10 transition-all"
                    >
                      <svg
                        class="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </Motion>
          </div>

          <!-- Form -->
          <Motion
            :initial="isMounted ? { opacity: 0, x: 100 } : false"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 1, delay: 0.6 }"
            class="lg:col-span-7"
          >

            <div class="relative">
              <div
                class="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-2xl opacity-20"
              ></div>
              <form
                @submit.prevent="handleSubmit"
                class="relative p-10 rounded-3xl bg-gradient-to-br from-gray-900/98 to-gray-800/98 border border-gray-700/50 backdrop-blur-2xl"
              >
                <div class="mb-10">
                  <div class="flex items-center gap-4 mb-4">
                    <div
                      class="w-1.5 h-12 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 rounded-full"
                    ></div>
                    <h2 class="text-4xl font-black text-white">Send Message</h2>
                  </div>
                  <p class="text-gray-400 text-sm ml-8">
                    Fill out the form and I'll get back to you within 24 hours
                  </p>
                </div>

                <div class="space-y-6">
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label class="form-label">
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Full Name
                      </label>
                      <input
                        v-model="form.name"
                        type="text"
                        required
                        class="form-input"
                        :class="{ 'border-red-500 focus:border-red-500': fieldErrors.name }"
                        placeholder="John Doe"
                      />
                      <p v-if="fieldErrors.name" class="error-message">{{ fieldErrors.name }}</p>
                    </div>
                    <div>
                      <label class="form-label">
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Email Address
                      </label>
                      <input
                        v-model="form.email"
                        type="email"
                        required
                        class="form-input"
                        :class="{ 'border-red-500 focus:border-red-500': fieldErrors.email }"
                        placeholder="john@example.com"
                      />
                      <p v-if="fieldErrors.email" class="error-message">{{ fieldErrors.email }}</p>
                    </div>
                  </div>

                  <div>
                    <label class="form-label">
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                      Subject
                    </label>
                    <input
                      v-model="form.subject"
                      type="text"
                      required
                      class="form-input"
                      :class="{ 'border-red-500 focus:border-red-500': fieldErrors.subject }"
                      placeholder="Project Inquiry / Collaboration"
                    />
                    <p v-if="fieldErrors.subject" class="error-message">{{ fieldErrors.subject }}</p>
                  </div>

                  <div>
                    <label class="form-label">
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Your Message
                    </label>
                    <textarea
                      v-model="form.message"
                      required
                      rows="6"
                      class="form-input"
                      :class="{ 'border-red-500 focus:border-red-500': fieldErrors.message }"
                      placeholder="Tell me about your project..."
                    ></textarea>
                    <p v-if="fieldErrors.message" class="error-message">{{ fieldErrors.message }}</p>
                  </div>

                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="submit-btn group"
                  >
                    <span
                      class="relative z-10 flex items-center justify-content-center gap-3"
                    >
                      <span v-if="!isSubmitting">Send Message</span>
                      <span v-else>Sending...</span>
                      <svg
                        v-if="!isSubmitting"
                        class="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    v-if="showSuccess"
                    class="p-6 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50"
                  >
                    <div class="flex items-center gap-4">
                      <div
                        class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-content-center"
                      >
                        <svg
                          class="w-6 h-6 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 class="text-green-300 font-bold">Message Sent!</h4>
                        <p class="text-green-400/80 text-sm">
                          I'll get back to you within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="showError"
                    class="p-6 rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/50"
                  >
                    <div class="flex items-center gap-4">
                      <div
                        class="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-content-center"
                      >
                        <svg
                          class="w-6 h-6 text-red-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 class="text-red-300 font-bold">Error!</h4>
                        <p class="text-red-400/80 text-sm">
                          {{ errorMessage }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Motion>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import type { ContactFormData, ContactFormErrors } from "~/types/contact";

const contactTitle = "Hire Matin Jahi — Frontend Developer (Vue.js & Nuxt.js)";
const contactDescription =
  "Get in touch with Matin Jahi (متین جاهی) - Frontend Developer. Available for freelance projects, collaborations, and full-time opportunities. Contact via email, Telegram, or LinkedIn.";
const contactUrl = "https://matinjahi.netlify.app/contact";
const contactImage = "https://matinjahi.netlify.app/og-image.jpg";

useHead({
  title: contactTitle,
  meta: [
    { name: "description", content: contactDescription },
    {
      name: "keywords",
      content:
        "Contact Matin Jahi, تماس با متین جاهی, hire frontend developer, استخدام برنامه نویس فرانت اند, Vue.js developer for hire, freelance web developer Isfahan, contact web developer Iran",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: contactUrl },
    { property: "og:title", content: contactTitle },
    { property: "og:description", content: contactDescription },
    { property: "og:image", content: contactImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: contactTitle },
    { name: "twitter:description", content: contactDescription },
    { name: "twitter:image", content: contactImage },
  ],
  link: [{ rel: "canonical", href: contactUrl }],
});

const canvasContainer = ref<HTMLElement | null>(null);
const form = ref<ContactFormData>({ name: "", email: "", subject: "", message: "" });
const isSubmitting = ref(false);
const showSuccess = ref(false);
const showError = ref(false);
const errorMessage = ref("");
const fieldErrors = ref<ContactFormErrors>({});
const isMounted = ref(false);

const contacts = [
  {
    label: "Email",
    value: "matinjahi@gmail.com",
    href: "mailto:matinjahi@gmail.com",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    iconBg: "rgba(102, 126, 234, 0.1)",
    icon: '<svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
  },
  {
    label: "Telegram",
    value: "@Ritalleral",
    href: "https://t.me/Ritalleral",
    external: true,
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    iconBg: "rgba(6, 182, 212, 0.1)",
    icon: '<svg class="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/></svg>',
  },
  {
    label: "GitHub",
    value: "@Matinj031",
    href: "https://github.com/Matinj031",
    external: true,
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    iconBg: "rgba(168, 85, 247, 0.1)",
    icon: '<svg class="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
  },
  {
    label: "LinkedIn",
    value: "Matin Jahi",
    href: "https://linkedin.com/in/matin-jahi",
    external: true,
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    iconBg: "rgba(59, 130, 246, 0.1)",
    icon: '<svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  },
];

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  particles: THREE.Points,
  animationId: number;

let handleResize: (() => void) | null = null;

const handleSubmit = async () => {
  // Reset errors
  showError.value = false;
  showSuccess.value = false;
  errorMessage.value = "";
  fieldErrors.value = {};
  
  // Client-side validation
  const errors: ContactFormErrors = {};
  
  if (!form.value.name.trim()) {
    errors.name = "Name is required";
  } else if (form.value.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }
  
  if (!form.value.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email.trim())) {
    errors.email = "Please enter a valid email address";
  }
  
  if (!form.value.subject.trim()) {
    errors.subject = "Subject is required";
  } else if (form.value.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters";
  }
  
  if (!form.value.message.trim()) {
    errors.message = "Message is required";
  } else if (form.value.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }
  
  if (Object.keys(errors).length > 0) {
    fieldErrors.value = errors;
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    await $fetch("/api/contact", {
      method: "POST",
      body: {
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message,
      },
    });
    
    // Show success message
    showSuccess.value = true;
    
    // Reset form
    form.value = { name: "", email: "", subject: "", message: "" };
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);
    
  } catch (error: any) {
    console.error("Failed to send message:", error);
    
    // Check if it's a validation error from server
    if (error.data?.errors) {
      fieldErrors.value = error.data.errors;
      errorMessage.value = "Please fix the errors below";
    } else if (error.statusCode === 429) {
      // Rate limit error
      errorMessage.value = error.data?.error || "Too many requests. Please try again later.";
    } else {
      // Generic error
      errorMessage.value = error.data?.error || "Failed to send message. Please try again later.";
    }
    
    showError.value = true;
    
    // Hide error message after 7 seconds
    setTimeout(() => {
      showError.value = false;
    }, 7000);
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  // Set mounted flag for animations
  isMounted.value = true;

  if (!canvasContainer.value) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 50;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: false, // Disable antialiasing for better performance
    powerPreference: "high-performance",
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio
  canvasContainer.value.appendChild(renderer.domElement);

  const geometry = new THREE.BufferGeometry();
  // Reduced from 2000 to 800 particles for better performance
  const particleCount = 800;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 100;
    positions[i + 1] = (Math.random() - 0.5) * 100;
    positions[i + 2] = (Math.random() - 0.5) * 100;
    const color = new THREE.Color();
    color.setHSL(Math.random() * 0.2 + 0.6, 0.8, 0.6);
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.2, // Slightly larger to compensate for fewer particles
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });
  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    if (particles && renderer && scene && camera) {
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;
      renderer.render(scene, camera);
    }
  };
  animate();


  // Handle window resize
  handleResize = () => {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId);
  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
  }
  if (particles) {
    particles.geometry.dispose();
    (particles.material as THREE.Material).dispose();
  }
  if (handleResize) {
    window.removeEventListener("resize", handleResize);
  }
});
</script>

<style scoped>
.icon-container {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(156, 163, 175, 1);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-input {
  width: 100%;
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s;
}

.form-input::placeholder {
  color: rgba(156, 163, 175, 0.5);
}

.form-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(168, 85, 247, 0.5);
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
}

.submit-btn {
  position: relative;
  width: 100%;
  padding: 1.25rem 2rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, #8b5cf6, #ec4899, #3b82f6);
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
}

.submit-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s;
}

.submit-btn:hover:not(:disabled)::before {
  left: 100%;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #ef4444;
  font-weight: 500;
}
</style>
