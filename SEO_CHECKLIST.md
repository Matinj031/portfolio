# Final SEO Checklist — Matin Jahi Portfolio

Post-fix status of every audited item. Legend: ✅ Passing · ⚠️ Partial · ❌ Missing · 🔧 Fixed in this pass · 🖐️ Requires manual action.

---

## 1. Basic SEO Practices

| Item | Status | Notes / File |
|---|---|---|
| Unique descriptive `<title>` per page (50–60 chars) | 🔧 Fixed | `pages/index.vue`, `about.vue`, `projects.vue`, `contact.vue` — all now descriptive (were "About" / "Contact" / "Projects") |
| Unique meta description per page (150–160 chars) | ✅ | Per-page in each `useHead` |
| `<html lang>` correct | ✅ | `app.vue` `htmlAttrs.lang="en"` (no real i18n → single lang correct) |
| Favicon + apple-touch-icon + og:image fallback | 🔧 Fixed | `app.vue` — added `apple-touch-icon`; og:image now local |
| Clean, human-readable URLs | ✅ | `/`, `/projects`, `/about`, `/contact` |
| Canonical tag on every page | 🔧 Fixed | All 4 pages (contact was missing) |
| No important page accidentally noindexed | ✅ | `index, follow`; demo pages blocked in robots |
| Homepage title states name + role | 🔧 Fixed | "Matin Jahi — Frontend Developer (Vue.js & Nuxt.js)" |

## 2. Keyword Research

| Item | Status | Notes |
|---|---|---|
| Keyword→page mapping documented | 🔧 Fixed | See `SEO_AUDIT_REPORT.md` §2 |
| One primary + secondary keywords per page | 🔧 Fixed | Mapped in report §2 |
| H1 aligns with primary keyword | ⚠️ Partial | H1s are brand/voice-led ("Crafting beautiful web experiences"); keywords live in title/description. Kept intentionally to preserve personal voice. |
| Search intent considered per page | 🔧 Fixed | Report §2 |
| GSC query data / Keyword Planner | 🖐️ Manual | Needs GSC access (see manual actions) |

## 3. Technical SEO

| Item | Status | Notes / File |
|---|---|---|
| robots.txt correct + references sitemap | 🔧 Fixed | `public/_robots.txt` — sitemap ref already present; added demo disallows + AI-crawler policy |
| sitemap.xml generated, all pages | ✅ | `@nuxtjs/sitemap` v8 (added as direct dep + configured). All 4 pages (`/`, `/projects`, `/about`, `/contact`) with `lastmod`; `/card-demo` excluded. Removed redundant hand-rolled `server/routes/sitemap.xml.js`. Prerendered at build → `/sitemap_index.xml` |
| **Correct rendering mode (SSR/SSG not CSR)** | 🔧 **Fixed (HIGH)** | Removed `<ClientOnly>` + loading gate from `projects.vue`, `about.vue`, `contact.vue`. Verified `__ssrInlineRender:true` in build chunks |
| Core Web Vitals (LCP/CLS/INP) | ⚠️ Partial | `@nuxt/image` present; fonts preloaded. Heavy Three.js/motion on contact — client-only, acceptable. Not lab-tested. |
| No unnecessary render-blocking resources | ⚠️ Partial | Reasonable; not fully audited |
| HTTPS enforced + www/non-www consistency | 🖐️ Manual | Netlify subdomain — configure in Netlify + custom domain |
| Proper 404 (real status code) | ✅ | `error.vue` present; Nitro returns real 404 |
| Structured data (Person, WebSite, Breadcrumb, CreativeWork) | 🔧 Fixed | Person/WebSite/ProfessionalService (`app.vue`), AboutPage (`about.vue`), CollectionPage+ItemList (`projects.vue`) |
| robots.txt vs meta robots consistent | ✅ | No contradictions |
| No duplicate-content (trailing slash/case/params) | ⚠️ Partial | Canonicals set; no param pages exist |
| hreflang (if multilingual) | 🔧 Fixed | Removed false hreflang links (single-locale site; i18n module unused) |
| Fully responsive / mobile-friendly | ✅ | Tailwind responsive throughout |
| TTFB / caching (Nitro/CDN) | ⚠️ Partial | Netlify CDN; no explicit routeRule caching tuned |
| No broken internal/external links | 🖐️ Manual | `/about` now builds — verify post-deploy; run a link crawler |

## 4. Content & On-page SEO

| Item | Status | Notes |
|---|---|---|
| Logical heading structure (one H1, no skips) | ✅ | One H1 per page; H2/H3 hierarchy on about/projects |
| Sufficient original content per page | ✅ | About & projects are content-rich (experience, skills, projects) |
| Descriptive alt text on meaningful images | ⚠️ Partial | Few `<img>` (mostly CSS/SVG). Link-preview imgs use generic `alt="preview"` — cosmetic hover, not content. |
| Internal linking w/ meaningful anchors | ✅ | Nav + cross-links (about→projects/contact, index→projects/contact) |
| OG + Twitter cards per page w/ image | 🔧 Fixed | All 4 pages; image now same-domain `/og-image.jpg` |
| Readable, keyword-relevant slugs | ✅ | `/projects`, `/about`, `/contact` |
| Breadcrumbs (UI + schema) | ⚠️ Partial | Flat site (no deep routes) — not required; N/A for current depth |
| Resume/contact/social crawlable HTML | ✅ | Contact page server-rendered; resume PDF linked; social links crawlable |

## 5. Link Building & Off-page

| Item | Status | Notes |
|---|---|---|
| Outbound links use `rel="noopener"` | 🔧 Fixed | All `target="_blank"` external anchors (GitHub/demo/social on projects & contact) now use `rel="noopener noreferrer"` — verified in prerendered HTML |
| Backlink-building recommendations written | 🔧 Fixed | `SEO_AUDIT_REPORT.md` §5 |
| Social profiles consistent with `sameAs` | ✅ | GitHub/LinkedIn/Telegram in Person schema match contact page |

## 6. Agentic Search (AI-driven search)

| Item | Status | Notes |
|---|---|---|
| Content structured & LLM-extractable | ✅ | Clear headings, lists, tables; server-rendered |
| Answer-first content (who/what/stack early) | ✅ | Homepage H1 + subtitle; About hero states name/role/stack immediately |
| FAQ schema where relevant | ⚠️ Partial | None yet — optional recommendation in report |
| `llms.txt` considered | ⚠️ Partial | Not added (emerging, optional) — recommended in report |
| AI crawlers deliberately allowed/blocked | 🔧 Fixed | `public/_robots.txt` — explicit Allow for GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended |
| E-E-A-T signals (name, role, dates, real work) | ✅ | Person schema, dated experience, live project + GitHub links |

---

## 🖐️ Remaining Manual Actions (require human/external access)

These cannot be done in code and need you:

1. **Google Search Console** — Confirm the property is actually verified in the GSC dashboard (the `google-site-verification` meta tag `XOpaSrEBAEL48Ewy6W4gArvI1oW1d5qWVQKcQH3pTgI` is present in `nuxt.config.ts`, but tag presence ≠ completed verification). Then **submit `https://matinjahi.netlify.app/sitemap.xml`**.
2. **Custom domain** — The `*.netlify.app` subdomain limits brand/CTR. Register a domain (e.g. `matinjahi.dev`), set it as primary in Netlify, enable **force HTTPS**, and decide www vs non-www (redirect the other). Update all canonical/og URLs after migrating.
3. **Re-deploy & re-test `/about`** — The live `/about` 404 was a stale/broken deploy; this build renders it server-side. After deploying, fetch `/about` directly to confirm a 200.
4. **GA4 (optional)** — No analytics detected. If you want traffic data, install GA4 via `@nuxtjs/scripts` or GTM (async/defer, never inline in `<body>`).
5. **Google Keyword Planner / GSC query review** — Once GSC has data, mine real queries to refine titles/H1s.
6. **Backlink building** — Follow report §5: GitHub profile README → site, LinkedIn "Featured", Dev.to/Hashnode cross-posts, portfolio showcases.
7. **Run a link crawler** (e.g. Screaming Frog / Ahrefs free) post-deploy to confirm no broken internal/external links.
