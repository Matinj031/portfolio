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
      ],
    },

    pageTransition: { name: "page", mode: "out-in" },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@nuxt/content"],
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
