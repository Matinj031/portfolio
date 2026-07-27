<script setup lang="ts">
import MorphParticles from "~/components/MorphParticles.vue";
const { start, finish, isLoading } = useUseLoadingScreen();
const nuxtApp = useNuxtApp();

nuxtApp.hook("page:start", () => {
  start();
});

nuxtApp.hook("page:finish", () => {
  finish();
});

useHead({
  titleTemplate: "%s | Matin Jahi - Frontend Developer",
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
    {
      rel: "apple-touch-icon",
      href: "/images/MatinJahi.ico",
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "Matin Jahi - Frontend Developer Portfolio | متین جاهی - توسعه دهنده فرانت‌اند | Specialized in Vue.js, Nuxt.js, React, TypeScript, and modern web technologies. Building performant, accessible web applications.",
    },
    {
      name: "keywords",
      content:
        "Matin Jahi, متین جاهی, Frontend Developer, توسعه دهنده فرانت اند, Vue.js Developer, Nuxt.js Developer, React Developer, TypeScript, JavaScript, Tailwind CSS, GSAP Animation, Three.js, Web Developer Isfahan, برنامه نویس وب, Isfahan Developer, Iran Web Developer, UI/UX Developer, Progressive Web Apps, PWA, Single Page Application, SPA, Responsive Design, Web Performance, Frontend Engineer, Full Stack Developer, Modern Web Technologies, طراحی وب, برنامه نویس جاوا اسکریپت",
    },
    {
      name: "author",
      content: "Matin Jahi | متین جاهی",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    {
      name: "geo.region",
      content: "IR-07",
    },
    {
      name: "geo.placename",
      content: "Isfahan",
    },
    {
      name: "geo.position",
      content: "32.6546;51.6680",
    },
    {
      name: "ICBM",
      content: "32.6546, 51.6680",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Matin Jahi",
        alternateName: "متین جاهی",
        jobTitle: "Frontend Developer",
        description:
          "Frontend Developer specializing in Vue.js, Nuxt.js, React, and modern web technologies. Building performant and accessible web applications.",
        url: "https://matinjahi.netlify.app",
        image: "https://matinjahi.netlify.app/og-image.jpg",
        sameAs: [
          "https://linkedin.com/in/matin-jahi",
          "https://github.com/Matinj031",
          "https://t.me/Ritalleral/",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Isfahan",
          addressRegion: "Isfahan Province",
          addressCountry: "IR",
        },
        knowsAbout: [
          "Vue.js",
          "Nuxt.js",
          "React",
          "TypeScript",
          "JavaScript",
          "Tailwind CSS",
          "GSAP",
          "Three.js",
          "Frontend Development",
          "Web Development",
          "UI/UX Development",
        ],
        knowsLanguage: ["English", "Persian"],
      }),
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Matin Jahi Portfolio",
        alternateName: "نمونه کار متین جاهی",
        url: "https://matinjahi.netlify.app",
        description:
          "Professional portfolio of Matin Jahi, Frontend Developer specializing in Vue.js and Nuxt.js",
        inLanguage: ["en", "fa"],
      }),
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Matin Jahi - Frontend Development Services",
        alternateName: "متین جاهی - خدمات توسعه فرانت‌اند",
        image: "https://matinjahi.netlify.app/og-image.jpg",
        url: "https://matinjahi.netlify.app",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Isfahan",
          addressRegion: "Isfahan Province",
          addressCountry: "IR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 32.6546,
          longitude: 51.668,
        },
        priceRange: "$$",
        areaServed: {
          "@type": "Country",
          name: "Worldwide",
        },
      }),
    },
  ],
});

useSeoMeta({
  title: "Matin Jahi - Frontend Developer Portfolio | متین جاهی",
  ogTitle: "Matin Jahi - Frontend Developer | Vue.js & Nuxt.js Specialist",
  description:
    "Matin Jahi (متین جاهی) - Professional Frontend Developer Portfolio. Specialized in Vue.js, Nuxt.js, React, TypeScript, and modern web technologies. Building performant, accessible, and beautiful web applications. Based in Isfahan, Iran.",
  ogDescription:
    "Professional Frontend Developer specializing in Vue.js, Nuxt.js, React, and modern web technologies. View my portfolio of projects and expertise in building performant web applications.",
  ogImage: "https://matinjahi.netlify.app/og-image.jpg",
  ogImageAlt: "Matin Jahi - Frontend Developer Portfolio",
  twitterCard: "summary_large_image",
  ogUrl: "https://matinjahi.netlify.app",
  ogSiteName: "Matin Jahi Portfolio",
  ogType: "website",
  ogLocale: "en_US",
  ogLocaleAlternate: "fa_IR",
  twitterTitle: "Matin Jahi - Frontend Developer | Vue.js & Nuxt.js",
  twitterDescription:
    "Professional Frontend Developer Portfolio. Specialized in Vue.js, Nuxt.js, React, and modern web technologies.",
  twitterImage: "https://matinjahi.netlify.app/og-image.jpg",
  twitterSite: "@MatinJahi",
  twitterCreator: "@MatinJahi",
});
</script>

<!--
  The main layout of the application which includes the Nuxt layout component
  containing the loading screen, custom cursor, and the Nuxt page component.
  -->
<template>
  <NuxtLayout>
    <custom-cursor />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

@media (max-width: 768px) {
  .cursor-wrapper {
    display: none !important;
  }
}
</style>
