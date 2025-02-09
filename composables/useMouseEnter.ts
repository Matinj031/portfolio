import type { InjectionKey } from 'vue'
import { inject, onMounted, onUnmounted, provide, ref } from 'vue'

interface MouseEnterContext {
  isMouseEntered: Ref<boolean>
  setIsMouseEntered: (value: boolean) => void
}

const MouseEnterKey = Symbol() as InjectionKey<MouseEnterContext>

export function provideMouseEnter() {
  const isMouseEntered = ref(false)
  let throttleTimeout: number | null = null

  // Throttle function to limit the rate of updates
  const throttle = (fn: Function, delay: number) => {
    return (...args: any[]) => {
      if (throttleTimeout) return

      throttleTimeout = window.setTimeout(() => {
        fn(...args)
        throttleTimeout = null
      }, delay)
    }
  }

  const setIsMouseEntered = throttle((value: boolean) => {
    isMouseEntered.value = value
  }, 16) // Around 60fps

  // Reset state and clear timeout when window is resized
  const handleResize = () => {
    isMouseEntered.value = false
    if (throttleTimeout) {
      window.clearTimeout(throttleTimeout)
      throttleTimeout = null
    }
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (throttleTimeout) {
      window.clearTimeout(throttleTimeout)
    }
  })

  const context = {
    isMouseEntered,
    setIsMouseEntered,
  }

  provide(MouseEnterKey, context)
  return context
}

export function useMouseEnter() {
  const context = inject(MouseEnterKey)
  if (!context) {
    throw new Error('useMouseEnter must be used within a CardContainer')
  }
  return context
}
