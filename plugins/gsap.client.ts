import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

export default defineNuxtPlugin(() => {
    if (process.client) {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

        // Configure GSAP defaults
        gsap.config({
            nullTargetWarn: false,
            autoSleep: 60,
            force3D: true,
            units: {
                left: '%',
                top: '%',
                rotation: 'rad'
            }
        })
    }

    return {
        provide: {
            gsap
        }
    }
})
