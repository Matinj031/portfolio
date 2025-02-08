import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable)
    }

    return {
        provide: {
            gsap,
            Draggable,
            ScrollTrigger,
        },
    }
})
