# SEO Audit Report — Matin Jahi Portfolio

**Site:** https://matinjahi.netlify.app (Netlify subdomain, no custom domain yet)
**Framework:** Nuxt 4.4.8 · Vue 3.5 · Nitro preset `netlify` · `ssr: true`
**Audit date:** 2026-07-27 · **Auditor:** Senior Technical SEO / Nuxt Engineer (automated, code-verified)

> Every finding below was verified against source code (file + line). Live-render assumptions are flagged where applicable.

---

## 1. Executive Summary — most critical issues

| # | Severity | Issue | Evidence |
|---|----------|-------|----------|
| 1 | 🔴 Critical | **All primary content is client-rendered (`<ClientOnly>`), so crawlers see an empty shell.** Projects, About, Contact, and even the homepage H1/hero are inside `<ClientOnly>`; Projects also forces a `isLoading` placeholder ("Loading projects…") on mount. | `pages/projects.vue:32,183,301,521-525` · `pages/about.vue:13,438` · `pages/contact.vue:16,345` · `pages/index.vue:3,121` |
| 2 | 🔴 Critical | **`/about` missing from sitemap.xml** and the route is not prerendered — consistent with the live `/about` 404/indexing problem. | `server/routes/sitemap.xml.js` (writes only `/`, `/projects`, `/contact`) |
| 3 | 🔴 High | **Canonical conflict.** A global canonical to the homepage is set app-wide in `app.head`, which would canonicalize every page to `/` unless overridden. | `nuxt.config.ts:30` |
| 4 | 🔴 High | **Fake bilingual / hreflang.** `hreflang="fa"` and `hreflang="en"` alternates both point to the homepage, but there is no Persian route and i18n `locales: ['en']` only. This is an hreflang error that can devalue both. | `app.vue:27-35` · `nuxt.config.ts:125-128` |
| 5 | 🟠 High | **OG/Twitter image on external host (i.ibb.co)** while a local `/og-image.jpg` exists — external hosts break social previews if they go down/change. | `app.vue:163,174` · `pages/projects.vue:297` · `pages/about.vue:449` · local: `public/og-image.jpg` |
| 6 | 🟠 High | **No GA4 / analytics installed** — no measurement of search landing traffic or CWV field data. | not found in `nuxt.config.ts` / `package.json` |
| 7 | 🟡 Medium | **Homepage title/H1 don't lead with name + role.** Title is "Home", H1 is "Crafting beautiful web experiences" — personal-brand search ("Matin Jahi") and "Frontend Developer" not front-loaded. | `pages/index.vue:35-44,136` |
| 8 | 🟡 Medium | **Stray demo page `/card-demo` is indexable** with placeholder content, wrong alt text ("Pateh" on all images), and no SEO value — dilutes crawl + quality signals. | `pages/card-demo.vue` |
| 9 | 🟡 Medium | **Broken/unused `JsonLd.vue`** ships invalid JSON-LD (missing comma, wrong job title "Full Stack Developer") if ever rendered. | `components/JsonLd.vue:1-16` |
| 10 | 🟡 Medium | **No `llms.txt`, no AI-crawler policy** in robots; no FAQ schema; answer-first bio not present in SSR HTML (tied to #1). | robots config · content structure |

---

## 2. Verified architecture summary (Phase 0 output)

| Area | Status | Notes |
|---|---|---|
| SSR enabled | ✅ | `nuxt.config.ts:6` `ssr: true` |
| Rendering actually reaching crawler | ❌ | `<ClientOnly>` blocks negate SSR for all main content |
| Nuxt 4 conventions | ⚠️ | Root-level `app.vue`/`pages/` used (no `app/` dir); functional, not blocking |
| i18n | ❌ | `locales:['en']`; bilingual is meta-only; bogus `fr` messages in `i18n.config.ts` |
| Sitemap | ⚠️ | hand-rolled, missing `/about`, no `lastmod` |
| robots | ⚠️ | `@nuxtjs/robots` + redundant `public/_robots.txt` (not served due to underscore) |
| JSON-LD (Person/WebSite) | ✅ (in `app.vue`) | + per-page CollectionPage/AboutPage; one broken unused component |
| GSC verification | ✅ meta present | dashboard verification = manual |
| GA4 | ❌ | absent |

---

## 3. Full checklist audit

### 3.1 Basic SEO
| Item | Status | Evidence / note |
|---|---|---|
| Unique descriptive `<title>` per page | ⚠️ | Present but generic: "Home"/"Projects"/"About"/"Contact" via `titleTemplate` (`app.vue:15`). Not keyword/name-led. |
| Unique meta description per page | ✅ | All 4 pages define one (`index.vue:139`, `projects.vue:317`, `about.vue:465`, `contact.vue:359`) |
| `<html lang>` | ⚠️ | `lang="en"` correct (`nuxt.config.ts:37`, `app.vue:17`) but no per-locale handling (and no real locales) |
| Favicon / apple-touch-icon / og fallback | ⚠️ | Two conflicting favicons (`nuxt.config.ts:29` `/favicon.ico` vs `app.vue:24` `/images/MatinJahi.ico`); **no apple-touch-icon**; og fallback exists locally but unused |
| Clean URLs | ✅ | `/projects`, `/about`, `/contact` — human-readable, no params |
| Canonical on every page | ❌ | Global canonical→home in config conflicts; per-page canonicals exist on projects/about only; **home & contact have none** |
| No accidental `noindex` | ✅ | robots meta is `index,follow` (`nuxt.config.ts:21-26`) |
| Homepage states name + role | ❌ | Title "Home", H1 has no name/role |

### 3.2 Keyword research
| Item | Status | Note |
|---|---|---|
| Keyword→page mapping documented | ❌ | Not documented — **added in this report (§5)** |
| Primary + secondary keywords per page | ⚠️ | Keywords stuffed in `meta-keywords` (no ranking value) but not mapped to H1/title |
| H1 aligns with primary keyword | ❌ | Home H1 = "Crafting beautiful web experiences"; projects H1 = "Recent Projects" (ok-ish); about H1 = "Engineering the web with craft & care" |
| Search intent considered | ⚠️ | Navigational (name) not satisfied on home; transactional ("hire vue developer") not targeted on contact |

### 3.3 Technical SEO
| Item | Status | Evidence / note |
|---|---|---|
| robots.txt correct + references sitemap | ⚠️ | `@nuxtjs/robots` config ok (`nuxt.config.ts:60-63`); redundant `public/_robots.txt`; no AI-crawler policy |
| sitemap.xml dynamic + complete | ❌ | Missing `/about`; no `lastmod`; excludes stray `/card-demo` (good) but by accident |
| Content pages SSR/SSG not CSR | ❌ | **Critical — see Exec #1** |
| Core Web Vitals (LCP/CLS/INP) | ⚠️ | `@nuxt/image` installed but barely used; Three.js + GSAP + custom cursor on all pages; loading state delays projects LCP |
| No render-blocking resources | ⚠️ | Google Fonts `@import` inside `loading-screen.vue:173` (render-blocking CSS import); fonts.css not preloaded |
| HTTPS + redirects | ✅ | Netlify enforces HTTPS; www/non-www N/A on subdomain |
| Custom 404 with real 404 status | ⚠️ | `error.vue` exists but bare-bones (no links, no styling, no name) |
| JSON-LD structured data | ⚠️ | Person/WebSite/ProfessionalService in `app.vue` ✅; CollectionPage/AboutPage per page ✅; **no BreadcrumbList, no FAQ**; broken unused `JsonLd.vue` |
| robots.txt vs meta robots conflict | ✅ | None — both allow |
| Duplicate content (slashes/case/params) | ⚠️ | No trailing-slash/canonical normalization strategy; canonical conflict (Exec #3) |
| hreflang (if multilingual) | ❌ | Declared but false — see Exec #4 |
| Responsive / mobile-friendly | ✅ | Tailwind responsive throughout |
| TTFB / caching | ⚠️ | Netlify CDN + immutable `/_nuxt/*` ✅ (`netlify.toml:14-17`); no prerendered HTML (SSR per-request); no SWR/route cache rules |
| No broken links | ⚠️ | Live `/about` 404 reported; external `voice-assistant.bot` / `gamatrain.com` etc. unverified — **manual check** |

### 3.4 Content & on-page
| Item | Status | Evidence / note |
|---|---|---|
| One H1 per page, no skipped levels | ⚠️ | Single H1 ✅; projects use `h3` for card titles under H1 (skips H2) |
| Sufficient original content | ✅ | Rich real copy on about/projects — but it's CSR-only (invisible to crawlers) |
| Descriptive alt text | ❌ | `card-demo.vue` uses `alt="Pateh"` on 3 different images (`:28,:61,:93`); few real imgs elsewhere |
| Internal linking w/ meaningful anchors | ⚠️ | Home↔projects↔contact links exist; about has good CTAs; no cross-links from projects→about |
| OG + Twitter cards per page | ⚠️ | Set, but external og:image (Exec #5); contact page has no OG tags |
| Readable slugs | ✅ | No `/projects/1`-style ids |
| Breadcrumbs (UI + schema) | ❌ | None (acceptable for 1-level depth; note only) |
| Resume/contact/social crawlable HTML | ⚠️ | Contact links are real `<a>` ✅ but inside `<ClientOnly>`; resume PDF link on about ✅ |

### 3.5 Off-page
| Item | Status | Note |
|---|---|---|
| `rel="noopener"` on outbound | ⚠️ | `target="_blank"` links in projects/contact/card-demo lack `rel="noopener"` (about resume link has it) |
| Backlink strategy (written guidance) | ❌ | Provided in §6 |
| Social links + `sameAs` consistency | ✅ | GitHub/LinkedIn/Telegram in `sameAs` (`app.vue:86-90`) and on contact page |

### 3.6 Agentic search (SGE / Perplexity / ChatGPT)
| Item | Status | Note |
|---|---|---|
| LLM-extractable structure | ⚠️ | Good semantic HTML *if rendered* — but CSR-only (Exec #1) |
| Answer-first key facts | ❌ | "Who/what/stack" not in SSR HTML |
| FAQ schema | ❌ | None |
| `llms.txt` | ❌ | None — **added in fixes** |
| AI-crawler policy (GPTBot etc.) | ❌ | No deliberate allow/block |
| E-E-A-T signals | ⚠️ | Real experience/dates/companies exist on About (CSR); need them in SSR + schema |

---

## 4. Prioritization (Impact × Effort)

| Priority | Fix | Impact | Effort |
|---|---|---|---|
| P0 | Remove `<ClientOnly>` around main content on all 4 pages (make content SSR) | 🔥🔥🔥 | Low |
| P0 | Fix projects loading gate (render list in SSR; preload progressively) | 🔥🔥🔥 | Low |
| P0 | Add `/about` to sitemap + add `lastmod`; prerender static pages | 🔥🔥🔥 | Low |
| P0 | Remove global canonical→home; add per-page canonicals everywhere | 🔥🔥 | Low |
| P1 | Remove false hreflang alternates (keep single `en`) | 🔥🔥 | Low |
| P1 | Point og/twitter image to local `/og-image.jpg` | 🔥🔥 | Low |
| P1 | Rewrite titles/H1 to lead with "Matin Jahi — Frontend Developer" | 🔥🔥 | Low |
| P1 | `noindex` + remove-from-nav the `/card-demo` page (or delete) | 🔥 | Low |
| P1 | Delete broken `components/JsonLd.vue` | 🔥 | Low |
| P2 | Add FAQ schema + answer-first SSR intro; add `llms.txt`; AI-crawler robots policy | 🔥 | Low-Med |
| P2 | Add GA4 (async, non-blocking) | 🔥 | Low |
| P2 | Custom 404 with name/links | 🔥 | Low |
| P2 | Add `rel="noopener"` to outbound links | 🟢 | Low |
| P3 | apple-touch-icon, single favicon; BreadcrumbList; preload font | 🟢 | Low |

---

## 5. Keyword → page mapping (new)

| Page | Primary keyword | Secondary / LSI | Intent |
|---|---|---|---|
| `/` | Matin Jahi — Frontend Developer | Vue.js developer, Nuxt.js developer, متین جاهی | Navigational (name) + brand |
| `/projects` | Vue.js & Nuxt.js project portfolio | React projects, EdTech developer, flight booking system, LMS development | Commercial/investigational |
| `/about` | Senior Frontend Developer Isfahan | برنامه نویس فرانت اند اصفهان, web developer Iran, frontend engineer experience | Informational + trust |
| `/contact` | Hire Frontend Developer (Vue/Nuxt) | freelance Vue.js developer, Nuxt.js developer for hire, web developer Isfahan | Transactional |

*Once GSC is verified, replace with real query data (manual).*

---

## 6. Off-page / backlink guidance (written only — not code)

1. **GitHub profile README** — link `matinjahi.netlify.app` with anchor "My portfolio — Vue.js & Nuxt.js projects"; pin the 4 strongest repos.
2. **LinkedIn "Featured"** — add portfolio + Gamatrain + Pateh links (you already rank #1-2 for your name; LinkedIn is #1 — push the portfolio above it).
3. **Dev.to / Hashnode cross-posts** — write 2-3 short posts ("How I cut page load 35% in Nuxt 4", "Three.js in a Nuxt EdTech platform") each canonical-linking to your site.
4. **Portfolio showcases** — submit to madewithvuejs.com, vueschool/nuxt showcases, awwwards/cssda (long shot), and `nuxt.com` community.
5. **Consistency** — ensure GitHub/LinkedIn/Telegram URLs exactly match the `sameAs` in Person schema.
6. **Custom domain** — `matinjahi.dev` / `.com`: a branded domain strengthens E-E-A-T and lets you 301 the Netlify subdomain. (Manual, ~$10-15/yr.)

---

## 7. Assumptions made
- Canonical domain stays `matinjahi.netlify.app` (no custom domain yet).
- `/about` live-404 treated as deploy/prerender artifact; fixed via sitemap + prerender (code-level), real verification needs a live re-fetch (manual).
- No GSC/GA API access — query-level items marked **manual**.
- Persian targeting stays meta-level (no fa routes) — false hreflang removed rather than building out i18n.
