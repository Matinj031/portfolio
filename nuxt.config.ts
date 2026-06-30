// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    ssr: true,
    devtools: { enabled: process.env.NODE_ENV !== 'production' },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            meta: [
                {
                    name: 'google-site-verification',
                    content: 'XOpaSrEBAEL48Ewy6W4gArvI1oW1d5qWVQKcQH3pTgI',
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
                { rel: 'canonical', href: 'https://matinjahi.netlify.app' },
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
        '@nuxt/content',
        '@nuxtjs/robots',
        '@nuxtjs/seo',
        '@nuxt/image',
        'motion-v/nuxt',
    ],

    site: {
        url: 'https://matinjahi.netlify.app',
        name: 'Matin Jahi Portfolio',
        description: 'Matin Jahi (متین جاهی) - Frontend Developer Portfolio',
        defaultLocale: 'en',
    },

    robots: {
        allow: '/',
        sitemap: 'https://matinjahi.netlify.app/sitemap.xml',
    },

    content: {
        highlight: {
            theme: {
                default: 'min-light',
                dark: 'min-dark',
            },
        },
    },
    nitro: {
        prerender: {
            routes: ['/sitemap.xml'],
        },
        externals: {
            external: ['better-sqlite3', 'sharp'],
        },
    },
    colorMode: {
        classSuffix: '',
    },

    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [tailwindcss()],
        build: {
            target: 'esnext',
        },
    },

    runtimeConfig: {
    // Private keys (only available server-side)
        resendApiKey: process.env.NUXT_RESEND_API_KEY,
    },

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },
})
