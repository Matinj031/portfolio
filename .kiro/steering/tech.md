# Technology Stack

## Framework & Core

- **Nuxt 3** (v3.14+) - Vue.js meta-framework with SSR enabled
- **Vue 3** (latest) - Progressive JavaScript framework
- **TypeScript** - Type-safe development

## Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **Tailwind Typography** - Typography plugin
- **tw-animate-css** - Animation utilities
- **Color Mode** - Dark/light theme switching
- **Sass** - CSS preprocessor

## Animation & Effects

- **GSAP** (v3.12+) - Professional-grade animation library
- **Lenis** (v1.1+) - Smooth scroll library
- **Motion-v** - Vue motion library
- **Three.js** (v0.173+) - 3D graphics library
- **Simplex Noise** - Noise generation for effects

## Content & SEO

- **Nuxt Content** (v2.13+) - File-based CMS
- **Nuxt SEO** (v2.0+) - SEO utilities
- **Nuxt Image** (v1.9+) - Image optimization
- **Nuxt Robots** - robots.txt management
- **Nuxt i18n** - Internationalization (configured but not actively used)

## Development Tools

- **ESLint** with @antfu/eslint-config - Code linting
- **Stylelint** - CSS linting
- **VueUse** - Vue composition utilities

## Common Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate

# Preview production build
npm run preview

# Prepare Nuxt (runs automatically after install)
npm run postinstall
```

## Build Configuration

- SSR enabled for better SEO
- Prerendering configured for sitemap
- Auto-imports enabled for components and composables
