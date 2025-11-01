<template>
  <div :class="cn('relative inline-block', props.class)">
    <!-- Trigger -->
    <NuxtLink
      :to="url"
      :class="cn('text-black dark:text-white', props.linkClass)"
      @mousemove="handleMouseMove"
      @mouseenter="showPreview"
      @mouseleave="hidePreview"
    >
      <slot />
    </NuxtLink>

    <!-- Preview -->
    <Teleport to="body">
      <div
        v-if="isVisible"
        ref="preview"
        class="pointer-events-none fixed z-[9999]"
        :style="previewStyle"
      >
        <div
          class="overflow-hidden rounded-xl shadow-xl"
          :class="[popClass, { 'transform-gpu': !props.isStatic }]"
        >
          <div
            class="block rounded-xl border-2 border-transparent bg-white p-1 shadow-lg dark:bg-gray-900 relative"
          >
            <!-- Loading Spinner -->
            <div
              v-if="isLoading"
              class="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 rounded-lg z-10"
            >
              <div
                class="w-8 h-8 border-3 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"
              ></div>
            </div>

            <img
              :src="previewSrc"
              :width="width"
              :height="height"
              class="size-full rounded-lg object-cover transition-opacity duration-300"
              :class="{ 'opacity-0': isLoading }"
              :style="imageStyle"
              alt="preview"
              @load="handleImageLoad"
              @error="handleImageError"
            />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, type CSSProperties } from "vue";
import { cn } from "@/lib/utils";

interface BaseProps {
  class?: string;
  linkClass?: string;
  width?: number;
  height?: number;
}

// Props for static image mode
interface StaticImageProps extends BaseProps {
  isStatic?: true;
  imageSrc?: string;
  url?: string; // optional in static mode
}

// Props for URL preview mode
interface URLPreviewProps extends BaseProps {
  isStatic?: false; // optional but must be false if specified
  imageSrc?: string; // optional in URL mode
  url?: string;
}

// Combined type that enforces the requirements
type Props = StaticImageProps | URLPreviewProps;
const props = withDefaults(defineProps<Props>(), {
  isStatic: false,
  imageSrc: "",
  url: "",
  width: 200,
  height: 125,
});

const isVisible = ref(false);
const isLoading = ref(true);
const preview = ref<HTMLElement | null>(null);
const hasPopped = ref(false);

// Cache for preview images
const previewCache = new Map<string, string>();

// Generate preview URL with caching
const previewSrc = computed(() => {
  if (props.isStatic) return props.imageSrc;

  // Check cache first
  if (previewCache.has(props.url)) {
    return previewCache.get(props.url);
  }

  const params = new URLSearchParams({
    url: props.url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    colorScheme: "light",
    "viewport.isMobile": "true",
    "viewport.deviceScaleFactor": "1",
    "viewport.width": String(props.width * 3),
    "viewport.height": String(props.height * 3),
  });

  const imageUrl = `https://api.microlink.io/?${params.toString()}`;
  previewCache.set(props.url, imageUrl);

  return imageUrl;
});

// Position tracking
const mousePosition = reactive({
  x: 0,
  y: 0,
});

// Calculate preview position
const previewStyle = computed<CSSProperties>(() => {
  const offset = 20;
  const previewWidth = props.width;
  const previewHeight = props.height;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Center horizontally around mouse
  let x = mousePosition.x - previewWidth / 2;
  // Keep within viewport bounds
  x = Math.min(Math.max(20, x), viewportWidth - previewWidth - 20);

  // Position above mouse cursor
  let y = mousePosition.y - previewHeight - offset;
  // If not enough space above, show below
  if (y < 20) {
    y = mousePosition.y + offset;
  }
  // Keep within viewport
  y = Math.min(Math.max(20, y), viewportHeight - previewHeight - 20);

  return {
    left: `${x}px`,
    top: `${y}px`,
    width: `${previewWidth}px`,
    height: `${previewHeight}px`,
  };
});

// Image specific styling
const imageStyle = computed<CSSProperties>(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
}));

// Pop animation class
const popClass = computed(() => {
  if (!hasPopped.value) return "";
  return "animate-pop";
});

function handleMouseMove(event: MouseEvent) {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
}

function showPreview() {
  isVisible.value = true;
  isLoading.value = true; // Reset loading state
  setTimeout(() => {
    hasPopped.value = true;
  }, 50);
}

function hidePreview() {
  isVisible.value = false;
  hasPopped.value = false;
}

function handleImageLoad() {
  isLoading.value = false;
}

function handleImageError() {
  console.warn(`Failed to load preview for ${props.url}`);
  isLoading.value = false;
}
</script>

<style scoped>
.transform-gpu {
  transform: scale3d(0, 0, 1);
  transform-origin: center bottom;
  will-change: transform;
  backface-visibility: hidden;
}

.animate-pop {
  animation: pop 1000ms ease forwards;
  will-change: transform;
}

@keyframes pop {
  0% {
    transform: scale3d(0.26, 0.26, 1);
  }
  25% {
    transform: scale3d(1.1, 1.1, 1);
  }
  65% {
    transform: scale3d(0.98, 0.98, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>
