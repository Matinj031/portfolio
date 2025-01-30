// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: true,
  devtools: { enabled: true },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "google-site-verification",
          content: "XOpaSrEBAEL48Ewy6W4gArvI1oW1d5qWVQKcQH3pTgI",
        },
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { name: "theme-color", content: "#ffffff" },
        { name: "robots", content: "index, follow" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://matinjahi.netlify.app" },
        {
          rel: "stylesheet",
          href: "/fonts/fonts.css",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
    },

    pageTransition: { name: "page", mode: "out-in" },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/content",
    "@nuxtjs/robots",
    "@nuxtjs/seo",
  ],
  content: {
    highlight: {
      theme: {
        default: "min-light",
        dark: "min-dark",
      },
    },
  },
  nitro: {
    prerender: {
      routes: ["/sitemap.xml"],
    },
  },
  colorMode: {
    classSuffix: "",
  },
});
