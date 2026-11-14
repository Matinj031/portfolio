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
            // NOTE: `htmlAttrs.lang` / `dir` are set per-locale in `app.vue`
            // (see useLocalizedHead) so the correct values are baked into the
            // prerendered HTML of every route instead of a static `en`.
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
        url: 'https://matinjahi.netlify.app',
        name: 'Matin Jahi Portfolio',
        description: 'Matin Jahi (متین جاهی) - Frontend Developer Portfolio',
        defaultLocale: 'en',
        trailingSlash: true,
    },

    robots: {
        robotsTxt: true,
        allow: '/',
        // The robots module expands each entry into its localized variants
        // (it already emits `Disallow: /fa/card-demo`), so only the default
        // path is listed here to avoid duplicate directives.
        disallow: ['/card-demo'],
        // The sitemap module injects the correct `<Sitemap>` directive
        // (`/sitemap_index.xml` for multi-sitemaps) so it is not duplicated here.
    },

    sitemap: {
        // `autoI18n` is enabled automatically because @nuxtjs/i18n is installed:
        // this produces /__sitemap__/en.xml and /__sitemap__/fa.xml plus a
        // /sitemap_index.xml, each entry carrying reciprocal hreflang alternates.
        exclude: ['/card-demo', '/card-demo/', '/fa/card-demo', '/fa/card-demo/'],
        autoLastmod: true,
        xsl: false,
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
            routes: [
                '/',
                '/projects/',
                '/about/',
                '/contact/',
                '/fa/',
                '/fa/projects/',
                '/fa/about/',
                '/fa/contact/',
                // Triggers the sitemap module to prerender the sitemap index and
                // the per-locale /__sitemap__/*.xml files at build time.
                '/sitemap.xml',
            ],
            crawlLinks: false,
        },
        minify: true,
        preset: 'static',
    },

    colorMode: {
        // Toggle a `light` / `dark` class on <html> — matched by the
        // `@custom-variant dark` rule in assets/css/main.css.
        classSuffix: '',
        // Follow the OS preference until the user picks a theme explicitly.
        preference: 'system',
        fallback: 'light',
        storage: 'localStorage',
        storageKey: 'nuxt-color-mode',
        // CRITICAL: while swapping the theme class would otherwise trigger colour
        // transitions on hundreds of elements at once — most expensively the
        // `backdrop-filter: blur()` glassy cards and the 900-rect grid pattern.
        // The module injects a temporary `* { transition: none !important }` style
        // around the swap so everything snaps instantly (no 2-3s freeze), then removes
        // removes it so normal hover interactions stay animated.
        disableTransition: true,
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
        // English keeps the existing, already-indexed URLs (`/`, `/about`, …).
        // Persian lives under the `/fa` prefix (`/fa/`, `/fa/about`, …).
        strategy: 'prefix_except_default',
        defaultLocale: 'en',
        locales: [
            {
                code: 'en',
                language: 'en',
                name: 'English',
                dir: 'ltr',
                file: 'en.json',
            },
            {
                code: 'fa',
                language: 'fa',
                name: 'فارسی',
                dir: 'rtl',
                file: 'fa.json',
            },
        ],
        // Resolved relative to `<rootDir>/i18n` → `i18n/locales/*.json`.
        langDir: 'locales',
        baseUrl: 'https://matinjahi.netlify.app',
        // Emit canonical/hreflang URLs with the trailing slash that Netlify's
        // Pretty URLs actually serve, so markup and sitemap stay consistent.
        trailingSlash: true,
        // Never auto-redirect by Accept-Language / IP: both language versions
        // must stay independently crawlable and directly reachable.
        detectBrowserLanguage: false,
        // Locale messages are code-split per locale by default, so only the
        // active dictionary is fetched on the client — no bundling overrides.
    },
})
