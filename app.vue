<script setup lang="ts">
import MorphParticles from "~/components/MorphParticles.vue";

const { start, finish, isLoading } = useUseLoadingScreen();
const nuxtApp = useNuxtApp();
const { t, locale } = useI18n();

const SITE_URL = "https://matinjahi.netlify.app";

// Locale-aware <html lang> / dir. These are baked into the prerendered HTML of
// every route (see nuxt.config.ts) instead of a static `en`/`ltr`.
const i18nHead = useLocaleHead({ dir: true, lang: true, seo: false });

const sameAs = [
  "https://linkedin.com/in/matin-jahi",
  "https://github.com/Matinj031",
  "https://t.me/Ritalleral/",
];

// Language-neutral — technology names stay in their original Latin form.
const knowsAbout = [
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
];

nuxtApp.hook("page:start", () => {
  start();
});

nuxtApp.hook("page:finish", () => {
  finish();
});

useHead(() => {
  const lang = String(locale.value);
  const isPersian = lang === "fa";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Matin Jahi",
    alternateName: "متین جاهی",
    jobTitle: t("site.role"),
    description: t("site.defaultDescription"),
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Isfahan",
      addressRegion: "Isfahan Province",
      addressCountry: "IR",
    },
    knowsAbout,
    knowsLanguage: ["English", "Persian"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: t("site.portfolioName"),
    url: SITE_URL,
    description: t("site.defaultDescription"),
    inLanguage: lang,
    publisher: { "@id": `${SITE_URL}/#person` },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Matin Jahi - Frontend Development Services",
    alternateName: "متین جاهی - خدمات توسعه فرانت‌اند",
    image: `${SITE_URL}/og-image.jpg`,
    url: SITE_URL,
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
    areaServed: { "@type": "Country", name: "Worldwide" },
  };

  return {
    htmlAttrs: i18nHead.value.htmlAttrs,
    title: t("site.defaultTitle"),
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/images/MatinJahi.ico" },
      // Persian typography — only requested for the Persian version so the
      // English pages don't pay for it.
      ...(isPersian
        ? [
            { rel: "preconnect", href: "https://fonts.googleapis.com" },
            {
              rel: "preconnect",
              href: "https://fonts.gstatic.com",
              crossorigin: "anonymous",
            },
            {
              rel: "stylesheet",
              href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap",
            },
          ]
        : []),
    ],
    meta: [
      { name: "description", content: t("site.defaultDescription") },
      { name: "author", content: "Matin Jahi | متین جاهی" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "geo.region", content: "IR-07" },
      { name: "geo.placename", content: "Isfahan" },
      { name: "geo.position", content: "32.6546;51.6680" },
      { name: "ICBM", content: "32.6546;51.6680" },
    ],
    script: [
      {
        key: "ld-person",
        type: "application/ld+json",
        innerHTML: JSON.stringify(personSchema),
      },
      {
        key: "ld-website",
        type: "application/ld+json",
        innerHTML: JSON.stringify(websiteSchema),
      },
      {
        key: "ld-service",
        type: "application/ld+json",
        innerHTML: JSON.stringify(serviceSchema),
      },
    ],
  };
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
