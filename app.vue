<template>
  <NuxtLayout>
    <loading-screen />
    <custom-cursor />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();
const { start, finish } = useUseLoadingScreen();

nuxtApp.hook("page:start", () => {
  start();
});

nuxtApp.hook("page:finish", () => {
  finish();
});

useHead({
  titleTemplate: "%s - Matin Jahi Portfolio",
  htmlAttrs: {
    lang: "en",
    dir: "ltr",
  },
  link: [
    {
      rel: "icon",
      type: "image/ico",
      href: "/images/MatinJahi.ico",
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "Discover Matin Jahi's portfolio showcasing frontend development expertise using Vue.js, Nuxt.js, and cutting-edge web technologies.",
    },
    {
      name: "keywords",
      content:
        "Matin Jahi, frontend developer, Vue.js, Nuxt.js, Tailwind CSS, animations, PWA development, modern web technologies",
    },
    {
      name: "author",
      content: "Matin Jahi",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "http://schema.org",
        "@type": "Person",
        name: "Matin Jahi",
        jobTitle: "Frontend Developer",
        description:
          "Explore the portfolio of Matin Jahi, showcasing expertise in Vue.js, Nuxt.js, and web technologies.",
        url: "https://matin-jahi-test.liara.run/",
        sameAs: [
          "https://linkedin.com/in/matin-jahi",
          "https://github.com/Matinj031",
          "https://t.me/Ritalleral/",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Isfahan",
          addressCountry: "IR",
        },
      }),
    },
  ],
});

useSeoMeta({
  title: "Matin Jahi Portfolio",
  ogTitle: "Matin Jahi - Frontend Developer Portfolio",
  description:
    "Discover Matin Jahi's portfolio, showcasing projects and expertise in frontend development using Vue.js, Nuxt.js, and modern web technologies.",
  ogDescription:
    "Explore the portfolio of Matin Jahi, a skilled frontend developer specializing in Vue.js, Nuxt.js, and cutting-edge web technologies.",
  ogImage: "https://i.ibb.co/rdXtHqC/photo-2021-10-04-15-51-52.jpg", // Replace with your image URL
  twitterCard: "summary_large_image",
  ogUrl: "https://matin-jahi-test.liara.run/", // Replace with your portfolio URL
  twitterTitle: "Matin Jahi Portfolio",
  twitterDescription:
    "Discover Matin Jahi's portfolio and his expertise in frontend development.",
  twitterImage: "https://i.ibb.co/rdXtHqC/photo-2021-10-04-15-51-52.jpg", // Replace with your image URL
});
</script>

<style>
body {
  font-family: "Roboto", cursive;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

* {
  cursor: none !important;
}

@media (max-width: 768px) {
  .cursor-wrapper {
    display: none !important;
  }
  * {
    cursor: auto !important;
  }
}
</style>
