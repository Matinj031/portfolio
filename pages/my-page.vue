<script setup lang="ts">
const timelineData = ref([
    {
        title: '2024',
        images: [
            { src: 'https://assets.aceternity.com/templates/startup-1.webp', alt: 'startup template' },
            { src: 'https://assets.aceternity.com/templates/startup-2.webp', alt: 'startup template' },
            { src: 'https://assets.aceternity.com/templates/startup-3.webp', alt: 'startup template' },
            { src: 'https://assets.aceternity.com/templates/startup-4.webp', alt: 'startup template' },
        ],
    },
    {
        title: 'Early 2023',
        description: 'I usually run out of copy, but when I see content this big, I try to integrate lorem ipsum.',
        images: [
            { src: 'https://assets.aceternity.com/pro/hero-sections.png', alt: 'hero template' },
            { src: 'https://assets.aceternity.com/features-section.png', alt: 'feature template' },
            { src: 'https://assets.aceternity.com/pro/bento-grids.png', alt: 'bento template' },
            { src: 'https://assets.aceternity.com/cards.png', alt: 'cards template' },
        ],
    },
    {
        title: 'Changelog',
        description: 'Deployed 5 new components on Aceternity today',
        changes: [
            'Card grid component',
            'Startup template Aceternity',
            'Random file upload lol',
            'Himesh Reshammiya Music CD',
            'Salman Bhai Fan Club registrations open',
        ],
        images: [
            { src: 'https://assets.aceternity.com/pro/hero-sections.png', alt: 'hero template' },
            { src: 'https://assets.aceternity.com/features-section.png', alt: 'feature template' },
            { src: 'https://assets.aceternity.com/pro/bento-grids.png', alt: 'bento template' },
            { src: 'https://assets.aceternity.com/cards.png', alt: 'cards template' },
        ],
    },
])
</script>

<template>
    <div class="timeline">
        <div v-for="(item, index) in timelineData" :key="index" class="timeline-item">
            <div class="timeline-title">
                {{ item.title }}
            </div>
            <div class="timeline-content">
                <template v-if="item.title === '2024'">
                    <p class="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Built and launched Aceternity UI and Aceternity UI Pro from scratch
                    </p>
                    <div class="grid grid-cols-2 gap-4">
                        <NuxtImg
                            v-for="(img, imgIndex) in item.images"
                            :key="imgIndex"
                            :src="img.src"
                            :alt="img.alt"
                            width="500"
                            height="500"
                            class="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-timeline"
                        />
                    </div>
                </template>

                <template v-else-if="item.title === 'Early 2023'">
                    <p class="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        {{ item.description }}
                    </p>
                    <div class="grid grid-cols-2 gap-4">
                        <NuxtImg
                            v-for="(img, imgIndex) in item.images"
                            :key="imgIndex"
                            :src="img.src"
                            :alt="img.alt"
                            width="500"
                            height="500"
                            class="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-timeline"
                        />
                    </div>
                </template>

                <template v-else-if="item.title === 'Changelog'">
                    <p class="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        {{ item.description }}
                    </p>
                    <div class="mb-8">
                        <div
                            v-for="(change, changeIndex) in item.changes"
                            :key="changeIndex"
                            class="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm"
                        >
                            ✅ {{ change }}
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <NuxtImg
                            v-for="(img, imgIndex) in item.images"
                            :key="imgIndex"
                            :src="img.src"
                            :alt="img.alt"
                            width="500"
                            height="500"
                            class="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-timeline"
                        />
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

  <style scoped>
  .shadow-timeline {
    box-shadow: 0 0 24px rgba(34, 42, 53, 0.06),
                0 1px 1px rgba(0, 0, 0, 0.05),
                0 0 0 1px rgba(34, 42, 53, 0.04),
                0 0 4px rgba(34, 42, 53, 0.08),
                0 16px 68px rgba(47, 48, 55, 0.05),
                0 1px 0 rgba(255, 255, 255, 0.1) inset;
  }
  </style>
