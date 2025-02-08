import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        const lenis = new Lenis({
            duration: 0.9,
            easing: t => Math.min(1, 1.001 - 2 ** (-8 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1,
            infinite: false,
        })
        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add((time) => {
            lenis.raf(time * 500)
        })
        gsap.ticker.lagSmoothing(0, 0.3)
        ScrollTrigger.refresh()

        // Add route change handling
        nuxtApp.hooks.hook('page:finish', () => {
            const hash = window.location.hash
            if (hash) {
                lenis.scrollTo(hash)
            }
        })

        // Handle anchor clicks
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement
            const anchor = target.closest('a')
            if (anchor && anchor.hash && anchor.origin === window.location.origin) {
                e.preventDefault()
                lenis.scrollTo(anchor.hash)
            }
        })

        return {
            provide: {
                lenis,
            },
        }
    }
})
