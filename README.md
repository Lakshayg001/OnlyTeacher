# TOT — The Online Tutors

Production-ready redesign of the TOT website plus an admin console, built in **React 18 + TypeScript + Vite + Tailwind CSS**.

> **Every Student Deserves the Best Teacher.**

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checked production build
npm run preview
```

---

## Brand system

| Token | Hex | Role |
| --- | --- | --- |
| Primary Dark | `#1B2E54` | Headings, navigation, dark panels |
| Primary Accent | `#FF9B25` | Primary CTAs, highlights, focus rings |
| Base | `#FFFFFF` | Page background, cards |
| Highlight | `#478A58` | Success, verification, callouts |

Full scales (`navy-*`, `amber-*`, `forest-*`) plus the soft panel tints (`cloud`, `lilac`, `peach`, `mint`, `sky`) live in [tailwind.config.js](tailwind.config.js). Typography is Baloo 2 (display) over Nunito (body) — the rounded, friendly pairing the reference deck uses.

### Claymorphic icon system

[`src/components/clay/ClayIcon.tsx`](src/components/clay/ClayIcon.tsx) is a hand-built set of **24 soft-3D "clay" icons** rendered as inline SVG — maths, science, physics, biology, chemistry, technology, engineering, globe, teacher, student and more. Each icon has a gradient body, gloss highlight, drop shadow and contact shadow, and is themed from a palette map. No icon-font or image request; they scale to any size and never 404.

---

## Public website

| Route | Contents |
| --- | --- |
| `/` | Full home page — 12 sections |
| `/about` | Story, values, classroom gallery, timeline, manifesto |
| `/courses` | Searchable catalogue, filters by subject / stage / board |
| `/teachers` | Filterable teacher directory + selection pipeline |
| `/blog` | Knowledge hub with category filter |
| `/contact` | 3-step demo booking flow with success state |

### Home page sections

1. **Hero** — "Every Student Deserves the Best Teacher.", floating clay icons, live-class and teacher-matched cards, orbit rings, 5-country trust pill, subject marquee.
2. **Statistics** — animated counters ("Every Student Matters. Every Teacher Makes a Difference.") with a photo collage.
3. **Global presence** — *Learning Without Borders*: an interactive dot-matrix world map.
4. **Our conviction** — sticky-left manifesto with five numbered promises.
5. **Explore courses** — stage tabs (Primary / Middle / Secondary / Senior) and the six academic specifications.
6. **Explore by board & curriculum** — CBSE, ICSE, IB, IGCSE, GCSE, A-Level, American, Australian.
7. **Easy interactive platform** — tabbed feature showcase.
8. **Top rated teachers** — scrollable rail filtered by subject.
9. **Your first lesson** — "Finding the right teacher should not be difficult."
10. **Testimonials** — auto-rotating carousel tagged with country, curriculum and subject.
11. **FAQ** — the seven "Questions parents ask", as an accordion.
12. **Knowledge hub** — lead article plus a list.

### The interactive world map

[`src/data/geo.ts`](src/data/geo.ts) stores coarse `[lng, lat]` rings for every landmass (~6 KB). At runtime a ray-casting point-in-polygon test rasterises them into **one SVG path of ~1,180 dots**, so the whole map is a single DOM node — no map library, no tiles, no network requests.

The five markers (India, UK, UAE, Australia, Japan) sit at their true equirectangular positions, with animated great-circle-style arcs radiating from the India hub. Hover or click a marker or a country chip to drive the detail panel; an auto-tour runs until the visitor takes over.

### Client requirements honoured

- **No pricing anywhere on the public site** — plans are described as being built after the free demo.
- **Country never changes price** — country drives curriculum, timezone and teacher matching only. This is stated explicitly on the map section and enforced as a toggle in admin settings.
- Boards and curricula get their **own top-level section**, not just a nav dropdown.
- Teacher cards lead with **subject expertise, board expertise, experience, ratings, grades and languages**.
- Testimonials carry **country, curriculum and subject** context.
- Minimal copy, heavy on visuals and iconography throughout.

---

## Admin console

`/admin` — a separate, code-split React app sharing the same design system.

| Route | Purpose |
| --- | --- |
| `/admin` | KPIs, bookings trend, country donut, board split, activity feed |
| `/admin/bookings` | Demo requests with status tabs and search |
| `/admin/students` | Roster with attendance and syllabus-progress meters |
| `/admin/teachers` | Directory with verification status and load |
| `/admin/courses` | Catalogue with live/hidden visibility toggles |
| `/admin/content` | Knowledge-hub articles with draft → review → published |
| `/admin/reports` | Trends, retention, regional operations |
| `/admin/settings` | Brand tokens, platform toggles, curricula, regions |
| `/admin/login` | Split-screen sign-in (demo — any credentials work) |

Charts (area, donut, bar list, meters) are **custom SVG** in [`AdminKit.tsx`](src/pages/admin/AdminKit.tsx) — no charting dependency.

---

## Architecture notes

```
src/
├── components/
│   ├── clay/ClayIcon.tsx      24 claymorphic 3D SVG icons
│   ├── home/                  12 home-page sections
│   ├── layout/                Navbar, Footer, PageHero, SiteLayout, ScrollTop
│   └── ui/                    Button, SectionHeading, Reveal, Counter, Marquee,
│                              Stars, SmartImage, Decor (blobs, doodles, floaters)
├── data/                      site.ts · admin.ts · images.ts · geo.ts
├── lib/                       hooks.ts (useInView, useCountUp, useTilt…) · utils.ts
├── pages/                     public pages + pages/admin/*
└── types/                     shared domain types
```

**`SmartImage`** wraps every photo: it shows a shimmer while loading and, if a remote asset ever fails, degrades to an on-brand gradient tile with a clay illustration and the alt text — the layout can never show a broken image.

**Content is fully data-driven.** Courses, boards, teachers, testimonials, FAQs, posts, countries and admin records all live in `src/data/`, typed against `src/types/index.ts`, so swapping in a CMS or API means replacing those modules only.

**Performance.** The home page ships in the main bundle; every other route is `React.lazy`-loaded behind a branded fallback, with `react` and `framer-motion` split into their own chunks. No route chunk exceeds 13 KB.

**Accessibility.** Semantic landmarks, visible `:focus-visible` rings, `aria-expanded` / `aria-pressed` / `role="switch"` on interactive controls, keyboard-operable map markers, labelled SVGs, and a global `prefers-reduced-motion` guard that disables animation.

One known exception: the primary button is white text on the amber accent (~2.1:1), below the WCAG 3:1 floor for large text. This is a deliberate brand pairing carried over from the reference design. To make it compliant, either darken the gradient in `VARIANT.primary` ([Primitives.tsx](src/components/ui/Primitives.tsx)) to `from-amber-500 to-amber-700` (4.3:1), or switch the label to `text-navy-800` (6.4:1). All amber *display* text elsewhere already uses navy for this reason.

**Responsive.** Mobile-first from 360 px up, with a spring-animated mobile drawer, horizontally scrollable filter rails and card carousels, and a collapsible admin sidebar.

---

## Photography

Education, teaching and study imagery is loaded from Unsplash CDN URLs, centralised in [`src/data/images.ts`](src/data/images.ts) — subject imagery (maths, physics, chemistry, biology, coding, engineering), classroom and study-at-home lifestyle, teacher portraits and blog art. To move to self-hosted assets, replace the URLs in that one file.
