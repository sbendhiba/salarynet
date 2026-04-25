# ERH Pro Ecosystem — AI Agent Guide

> Multi-root workspace containing all three sites of the ERH Pro HR tools ecosystem for Morocco.

---

## Ecosystem Overview

| Project | Domain | Role | Primary Color | Path |
|---------|--------|------|---------------|------|
| **hrtools** | `erh.ma` | Hub — central HR platform | Teal `hsl(174, 72%, 40%)` | `hrtools/` |
| **salarynet** | `salairenet.ma` | Spoke — salary calculator | Teal (similar) | `salarynet/salarynet/` |
| **indemn** | `indemnitelicenciement.ma` | Spoke — severance calculator | Blue `blue-600` | `indemn/` |

### Hub & Spoke Model
- **erh.ma** is the hub: broad HR coverage, blog, document generators, calculators
- **salairenet.ma** is niche: salary brut→net conversion, IR, CNSS, AMO
- **indemnitelicenciement.ma** is niche: severance pay calculation per labor code

All three sites are owned by the same entity (**e-RH Pro**) and share topical authority through cross-linking and consistent Organization schema.

---

## Tech Stack (all 3 projects)

| | hrtools | salarynet | indemn |
|---|---|---|---|
| **Framework** | Next.js 16 | Next.js 16 | Next.js (14+) |
| **Output** | `output: 'export'` (static) | `output: 'export'` (static) | `output: 'export'` (static) |
| **Trailing slash** | `trailingSlash: true` | `trailingSlash: true` | `trailingSlash: true` |
| **Styling** | Tailwind CSS 3 | Tailwind CSS 3 | Tailwind CSS 3 |
| **Deployment** | Netlify (static out/) | Netlify (static out/) | Netlify (static out/) |
| **CDN** | Cloudflare (proxied) | Cloudflare (proxied) | Cloudflare (proxied) |
| **Languages** | French only | French only | French, English, Arabic (i18n via `[lang]/`) |

### Build Commands

```bash
# hrtools (erh.ma)
npm run prebuild   # → fetch-articles from Supabase + generate-sitemap
npm run build      # → next build → out/

# salarynet (salairenet.ma)
npm run prebuild   # → generate-sitemap
npm run build      # → next build → out/

# indemn (indemnitelicenciement.ma)
npm run prebuild   # → generate-sitemap
npm run build      # → next build → out/
```

---

## Author / E-E-A-T Setup

### Shared Author Identity

All three sites use the **same author entity** to build a consistent E-E-A-T signal:

| Field | Value |
|-------|-------|
| **ID** | `erh-pro-expert` |
| **Name** | `Expert ERH Pro` |
| **LinkedIn** | `https://www.linkedin.com/company/erh-pro/` |
| **Credentials (fr)** | Expert en droit du travail & ressources humaines, Maroc |

### Author Data Files

| Project | File |
|---------|------|
| hrtools | `lib/authors.ts` |
| salarynet | `src/data/authors.ts` |
| indemn | `src/data/authors.ts` |

**CRITICAL**: When updating author data, update ALL THREE files identically. The author `name`, `credentials`, and `linkedinUrl` must be character-for-character identical across all sites — consistency is what builds the entity graph.

### AuthorBio Component

| Project | File | Used on |
|---------|------|---------|
| hrtools | `components/AuthorBio.tsx` | Blog posts |
| salarynet | — (not yet created) | guide-salaire (TODO) |
| indemn | `src/components/AuthorBio.tsx` | Guide, Law pages |

### Schema Author Type by Page

| Page type | `author` schema | `@type` |
|-----------|-----------------|---------|
| Blog post | `Person` (primaryAuthor) | `BlogPosting` |
| Guide / expert content | `Person` (primaryAuthor) | `Article` |
| Calculator / tool | `Organization` | `WebApplication` or `SoftwareApplication` |
| Homepage | `Organization` | `WebSite` |
| FAQ | (none — `FAQPage` has no author) | `FAQPage` |
| Legal pages | `Organization` | `WebPage` |

**IMPORTANT**: JSON-LD must be rendered in server components (`page.tsx`), NOT in `'use client'` components. Static exports with client-injected structured data may face delayed processing by Google.

---

## Organization Schema — sameAs

Every Organization JSON-LD across all 3 sites must include the full ecosystem in `sameAs`:

```json
"sameAs": [
  "https://www.linkedin.com/company/erh-pro/",
  "https://erh.ma/",
  "https://salairenet.ma/",
  "https://indemnitelicenciement.ma/"
]
```

Adjust per site — each site should list the **other** sites plus LinkedIn, but does NOT need to list itself.

### Where Organization schema lives

| Project | Files |
|---------|-------|
| hrtools | `app/a-propos/page.tsx` |
| salarynet | `src/app/page.tsx` (homepage) |
| indemn | `src/page-components/HomePage.tsx`, `ContactPage.tsx`, `FAQPage.tsx`, `ProcedurePage.tsx`, `src/app/[lang]/page.tsx`, `src/app/[lang]/contact/page.tsx`, `src/app/[lang]/procedure/page.tsx` |

---

## Cross-Linking (Footer)

All three sites link to each other in their footers under "Voir aussi":

| Project | Footer location | Links to |
|---------|----------------|----------|
| hrtools | `app/layout.tsx` (inline footer) | salairenet.ma, indemnitelicenciement.ma |
| salarynet | `src/components/Footer.tsx` | indemnitelicenciement.ma, erh.ma |
| indemn | `src/components/Layout.tsx` | salairenet.ma, erh.ma |

**indemn** also has cross-links in its header navigation under "Nos outils" dropdown.

---

## Sitemap Generation

| Project | Script | Trigger |
|---------|--------|---------|
| hrtools | `scripts/generate-sitemap.js` | `prebuild` (also includes articles from `data/articles.json`) |
| salarynet | `scripts/generate-sitemap.js` | `prebuild` |
| indemn | `scripts/generate-sitemap.mjs` | `prebuild` |

All scripts:
- Scan `app/` (or `src/app/`) for `page.tsx` files
- Get `lastmod` from git history (fallback: filesystem mtime)
- Output to `public/sitemap.xml`
- hrtools additionally includes blog articles from `data/articles.json`
- indemn additionally generates hreflang alternate links for fr/ar/en

---

## Blog (hrtools only)

- Articles fetched from **Supabase** at build time via `scripts/fetch-articles.js`
- Requires env vars: `SUPABASE_URL`, `SUPABASE_ANON_KEY`
- Stored as `data/articles.json` + individual `data/articles/{slug}.json`
- Pages generated via `app/blog/[slug]/page.tsx` with `generateStaticParams()`
- Uses `BlogPosting` schema with `Person` author
- Blog index at `app/blog/page.tsx` (no Person authorship needed)

---

## Conventions & Rules

### When making changes across the ecosystem

1. **Schema consistency**: Any Organization schema change must be applied to ALL files listed in the Organization schema section above
2. **Author identity**: Never change the author name/credentials on one site without updating all three
3. **Cross-links**: If a new site is added to the ecosystem, add it to all footers and all sameAs arrays
4. **Static export**: All sites use `output: 'export'` — no server-side APIs, no ISR, no middleware
5. **Trailing slashes**: All internal links must end with `/` to match `trailingSlash: true`
6. **Build before deploy**: Always run `npm run build` (which triggers `prebuild`) to regenerate sitemap

### File structure patterns

| Pattern | hrtools | salarynet | indemn |
|---------|---------|-----------|--------|
| App dir | `app/` | `src/app/` | `src/app/` |
| Components | `components/` | `src/components/` | `src/components/` |
| Data | `data/` | `src/data/` | `src/data/` |
| Scripts | `scripts/` | `scripts/` | `scripts/` |
| Public assets | `public/` | `public/` | `public/` |
| Author data | `lib/authors.ts` | `src/data/authors.ts` | `src/data/authors.ts` |

### SEO checklist for new pages

- [ ] Add `metadata` export with title, description, canonical URL
- [ ] Add JSON-LD structured data (correct `@type` per table above)
- [ ] Use `Person` author for expert content, `Organization` for tools/utility
- [ ] Include `BreadcrumbList` schema
- [ ] Add the page to sitemap (automatic via generate-sitemap script for static pages)
- [ ] For blog posts: ensure `datePublished`, `dateModified`, and `image` are set

### Color reference

| Site | Primary | Usage |
|------|---------|-------|
| erh.ma | `hsl(174, 72%, 40%)` / teal | CSS var `--primary`, Tailwind `teal-*` classes |
| salairenet.ma | teal-600 / teal | Tailwind `teal-*` classes |
| indemnitelicenciement.ma | blue-600 | Tailwind `blue-*` classes |

---

## Known TODOs

- [ ] Replace `Expert ERH Pro` placeholder with a real individual name for stronger E-E-A-T signal
- [ ] Replace LinkedIn company URL (`/company/erh-pro/`) with individual `/in/` profile
- [ ] Add `AuthorBio` component to salairenet's guide-salaire page
- [ ] Create dedicated `/author/erh-pro/` profile page on erh.ma (authority anchor)
- [ ] Add `ProfilePage` schema on the author page linking all 3 sites via `sameAs`
