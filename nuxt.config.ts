// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    ssr: true,
    devtools: { enabled: process.env.NODE_ENV !== 'production' },
    app: {
        baseURL: '/portfolio/',
        head: {

                    charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            meta: [
                {
                    name: 'google-site-verification',
                    content: 'XOpaSrEBAEL48Ewy6W4gArvI1oW1d5qWVQKcQH3pTgI',
                },
                {
                    name: 'google-site-verification',
                    content: 'Y8ktgl9t_18QL0Sq8reWghHFgAzz8tGxxkN43tvXzOM',
                },

                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'format-detection', content: 'telephone=no' },
                { name: 'theme-color', content: '#ffffff' },
                {
                    name: 'robots',
                    content:
            'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
                },
                { name: 'googlebot', content: 'index, follow' },
                { name: 'bingbot', content: 'index, follow' },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                {
                    rel: 'stylesheet',
                    href: '/fonts/fonts.css',
                },
            ],
            htmlAttrs: {
                lang: 'en',
            },
        },

        pageTransition: { name: 'page', mode: 'out-in' },
    },

    modules: [
        '@nuxtjs/i18n',
        '@nuxtjs/color-mode',
        // '@nuxt/content',
        '@nuxtjs/robots',
        '@nuxtjs/sitemap',
        '@nuxt/image',
        'motion-v/nuxt',
    ],

    site: {
        url: 'https://matinj031.github.io/portfolio',
        name: 'Matin Jahi Portfolio',
        description: 'Matin Jahi (متین جاهی) - Frontend Developer Portfolio',
        defaultLocale: 'en',
    },

    robots: {
        robotsTxt: false,
        allow: '/',
        sitemap: 'https://matinj031.github.io/portfolio/sitemap.xml',
    },



    sitemap: {
        exclude: ['/card-demo'],
        urls: [
            { loc: '/', changefreq: 'monthly', priority: 1 },
            { loc: '/projects', changefreq: 'monthly', priority: 0.8 },
            { loc: '/about', changefreq: 'monthly', priority: 0.7 },
            { loc: '/contact', changefreq: 'yearly', priority: 0.5 },
        ],
    },

    // content: {
    //     highlight: {
    //         theme: {
    //             default: 'min-light',
    //             dark: 'min-dark',
    //         },
    //     },
    // },
    nitro: {
        prerender: {
            routes: ['/', '/projects', '/about', '/contact', '/sitemap.xml'],
            crawlLinks: false,
        },
        minify: true,
        preset: 'static',
    },

    colorMode: {
        classSuffix: '',
    },

    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            include: [
                'three',
                'gsap',
                'gsap/ScrollTrigger',
                'gsap/ScrollToPlugin',
                'gsap/Draggable',
                'lenis',
                'clsx',
                'tailwind-merge',
                '@unhead/schema-org/vue',
            ],
        },
        build: {
            target: 'esnext',
            minify: 'esbuild',
            cssMinify: 'esbuild',
            rollupOptions: {
                output: {
                    manualChunks: {
                        'three': ['three'],
                        'gsap': ['gsap', 'gsap/ScrollTrigger', 'gsap/ScrollToPlugin'],
                        'vendor': ['@vueuse/core', 'lenis'],
                    },
                },
            },
        },
    },

    runtimeConfig: {
    // Private keys (only available server-side)
        resendApiKey: process.env.NUXT_RESEND_API_KEY,
    },

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
        baseUrl: 'https://matinj031.github.io/portfolio',
    },

})
