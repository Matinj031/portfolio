<template>
  <Transition name="fade">
    <div v-if="isLoading" class="fixed inset-0 z-50 bg-black">
      <div class="flex h-screen items-center justify-center">
        <div class="w-64">
          <div class="h-1 w-full bg-gray-800">
            <div
              class="h-1 bg-white transition-all duration-300"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
          <div class="mt-4 text-center text-white">
            {{ Math.round(progress) }}%
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const { isLoading, progress } = useUseLoadingScreen();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
