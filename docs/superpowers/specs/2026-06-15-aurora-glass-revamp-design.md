# Aurora Glass — mldl.study front-end revamp

**Date:** 2026-06-15
**Scope:** Core experience — HomePage, the 4 roadmap pages (Prerequisites / ML / DL / GenAI), shared Navbar, Footer, Modal, BackToTopButton.
**Out of scope (deferred):** Dashboard, Books, Journey, QuestionBank, Search, Bookmarks, legal pages, 404. These keep their existing bodies but inherit the new Navbar/Footer.

## Direction
Deep dark canvas, frosted-glass panels, slow-drifting violet→cyan→blue→fuchsia aurora glow, subtle grain, crisp type. Dark is the primary theme; light mode stays polished. Motion is alive but restrained, and fully respects `prefers-reduced-motion`.

- **Type:** Sora (display) · Hanken Grotesk (body) · JetBrains Mono (numerics). Loaded via Google Fonts.
- **Tokens:** CSS custom properties for dark + light in `src/index.css` (`--bg`, `--glass-*`, `--text*`, `--aurora-*`). Tailwind `darkMode: 'class'` (fixes a latent bug where `dark:` followed the OS, not the toggle).
- **Reusable utilities:** `.glass`, `.glass-strong`, `.glass-sheen`, `.text-aurora`, `.border-aurora`, `.btn-aurora`, `.grain`.

## Key architecture decision — shared `RoadmapView`
The 4 roadmap pages were ~430–509 lines of near-duplicate logic (state, progress, search/sort, graph, modal). They now collapse to ~50-line **config** files that render a single `RoadmapView`, passing `topics`, `connections`, `content`, `storageKey`, `accent`, `seo`, and `next`. The animated graph is built once.

All prior behavior preserved: localStorage progress (same keys: `prerequisiteRoadmapProgress`, `mlRoadmapProgress`, `dlRoadmapProgress`, `genaiRoadmapProgress`), search, sort, mobile cards, GA, SEO, per-topic resource modal.

## Components
- **`AuroraBackground`** — one fixed `-z-10` ambient layer (base color lives on `<html>` so the layer paints above the canvas). Animated blobs + masked grid + grain + vignette.
- **`Navbar`** — floating glass pill, condenses on scroll, animated gradient underline, glass "More" dropdown, refined mobile bottom-sheet.
- **`HomePage`** — aurora hero with animated gradient headline, glass roadmap cards with cursor-tracking spotlight + hover glow, scroll-reveal feature/video/FAQ sections, glass contribution modal.
- **`RoadmapView`** — animated SVG node-graph: gradient progress rings, glass nodes, flowing dashed connection edges, hover focus (light connected edges, dim the rest), vertical layout auto-normalized to fill the panel. Mobile = glass cards.
- **`Modal`** — glass surface, `AnimatePresence` enter/exit, accent-aware progress, resource rows with bookmark/complete. Fixed two pre-existing bugs (undefined `animate-fadeIn`; a broken `${darkMode}` literal inside a className string).
- **`Footer` / `BackToTopButton`** — restyled to palette.

## Per-roadmap accents
Prereq = emerald/teal · ML = blue/indigo · DL = violet/fuchsia · GenAI = amber/orange (matching the homepage cards).

## Guardrails
Routes, GA, SEO/Helmet, localStorage keys, BookmarksContext, and all content `.js` files untouched. Production build passes. Accessibility: focus-visible rings, reduced-motion, contrast on glass.
