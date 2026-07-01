# Brutal Revamp — Design Spec

**Date:** 2026-07-02
**Status:** Approved (brainstormed with visual companion; direction picked from 4 full-size mockups)
**Goal:** Make mldl.study the #1 destination for AI/ML roadmaps. This project: a full-site neo-brutalist rebuild plus three talk-worthy features. Next project (separate spec): SEO content engine.

## Decisions log

- **Direction:** Neo-Brutalist ("B"), chosen over Neural Cosmos / Terminal OS / Y2K Chrome.
- **Scope:** Whole site, one shot. Aurora Glass system is replaced entirely.
- **Features in:** shareable progress cards, gamification (XP/streaks/unlocks), Cmd+K palette. NN playground: out.
- **SEO:** protect now, expand next. Zero regression to routes/meta/sitemap/guide copy; cheap adds only (JSON-LD, preloads).
- **Themes:** both. Light (cream) is default and signature; dark is true brutalist dark, not gray glass.
- **Approach:** #1 — reinvent HomePage + RoadmapView; restyle all other pages in place (presentation-only, logic untouched).

## 1. "Brutal" design system

Tokens (replace Aurora block in `src/index.css`):

| Token | Light (default) | Dark |
|---|---|---|
| `--bg` | `#FFF4E0` cream | `#0D0D0D` |
| `--surface` | `#FFFFFF` | `#1A1A1A` |
| `--ink` | `#0A0A0A` | `#FFF4E0` (cream ink + cream borders) |
| `--muted` | `#4A4A44` | `#B8B2A0` |
| accents | acid `#C6FF00`, electric `#3300FF`, hot-pink `#FF2E88`, cyber-yellow `#FFD400` | same accents |
| pastel fills | pink `#FFD6E8`, blue `#D6E4FF`, yellow `#FFF3B0`, mint `#D8FFDB` | darkened equivalents |
| `--shadow-color` | `#0A0A0A` | acid or cream (must pop on black) |

Per-roadmap accents: Prereq=mint, ML=electric blue, DL=hot pink, GenAI=cyber yellow.

Type: display **Archivo Black** (uppercase headlines), body **Space Grotesk**, mono **JetBrains Mono** (kept). Google Fonts, same loading pattern as today, with preloads.

Utilities (replace `.glass*`, `.btn-aurora`, `.border-aurora`, `.text-aurora*`): `.brut-card` (3px ink border, `6px 6px 0` hard shadow, surface bg), `.brut-btn` (press effect: hover translates toward shadow), `.brut-sticker` (rotated circular badge, wobble), `.brut-marquee` (looping strip), `.brut-tilt-l`/`.brut-tilt-r` (±1°), `.brut-chip`. Chunky square scrollbar, acid selection, thick focus outlines.

Background: delete `AuroraBackground`; new `BrutalBackground` = flat canvas + subtle oversized halftone-dot pattern. No blur or gradients anywhere. The `<html>` canvas-color convention can be simplified since there is no fixed `-z-10` layer anymore, but dark-mode class plumbing (`useDarkMode.js` + inline script in `index.html`) stays.

Motion: framer-motion stays; language = "snap and stamp" (instant springs, hover-press, marquees). Keep `prefers-reduced-motion` block.

## 2. Flagship rebuilds

**HomePage (from scratch):** marquee strip ("★ FREE FOREVER ★ NO SIGNUP ★ 500+ CURATED RESOURCES ★"); giant Archivo Black headline ("LEARN AI. NO FLUFF." — highlight block rotated ~1°); wobbling "100% FREE" sticker; press CTA; 4 tilted pastel roadmap cards with chunky progress bars + XP/level chip + streak flame; unlock badges ("UNLOCKS AT ML ≥ 60%") — visual only, never blocks navigation; stats strip; existing newsletter CTA + social follow blocks + SEO guide links restyled, none dropped.

**RoadmapView (rebuilt, same props interface** `topics/connections/content/storageKey/title/subtitle/accent/seo/next/roadmapType`**):** roadmap pages remain thin config wrappers. Node graph = small rotated brutalist cards in pastel fills connected by thick black stepped edges (subway-map-with-a-marker look). Sticky progress header: chunky bar, XP + streak counters, Share button. Modal = brutalist window with title bar; completing a resource stamps a "+10 XP" toast. localStorage schema unchanged.

**All other pages** (Dashboard, Books, Bookmarks, Search, Journey, QuestionBank, ResearchPaper, Privacy, Terms, Error404, and the 7 SEO guide pages): restyle in place, **presentation-only, logic untouched**. Guide pages keep headings, copy, and internal links exactly.

**Navbar:** wordmark, chunky links, theme toggle, XP chip, ⌘K button. **Footer:** bold columns.

## 3. Features

**GamificationContext** (no backend, no accounts):
- XP derived from existing roadmap localStorage keys, +10/completed resource — retroactive, no migration.
- Levels: Perceptron → Gradient Descender → Backpropagator → Transformer → Superintelligence(ish).
- Streaks: new localStorage key = activity log of completion dates; streak = consecutive days. Written on each completion.
- Unlock states derived from per-roadmap %. Storage-unavailable degrades to zeros (existing try/catch pattern).

**ShareCard:** draws 1200×630 brutalist card on `<canvas>` (headline, chunky progress bar, streak flame, level name, mldl.study). Zero new deps. Download PNG / Web Share API / X intent with prefilled text. Canvas failure → plain text X intent. Entry: roadmap header, dashboard, level-up toast.

**CommandPalette:** Cmd/Ctrl+K + navbar button (mobile taps button). Index lazy-built on first open from pages + topics + resources in `categorized*Content.js` (dynamic import). Dependency-free fuzzy scoring, keyboard nav; topics deep-link into their roadmap and auto-open the modal. Index failure → pages-only results.

## 4. SEO protection, errors, verification

- All 21 routes unchanged. `scripts/prerender-seo.mjs` keeps working; add JSON-LD (`WebSite`+`SearchAction`; `Course`/`ItemList` on roadmap pages) and font preloads.
- OG image redrawn brutalist **at the same URL**.
- Dep audit: remove unused heavy deps (`react-tsparticles`, `tsparticles`, `react-force-graph-3d`, `three-spritetext`, `dannjs`, `react-flow-renderer`…) after confirming no imports. Smaller bundle → CWV → ranking.
- Error handling: keep existing try/catch localStorage patterns; feature fallbacks above.
- Verification gate: (1) `npm run build` + lint green; (2) Playwright sweep — every route light+dark screenshots, seeded-progress XP/streak render check, palette open/search/navigate, share PNG downloads; (3) diff prerendered `<head>` per route vs pre-revamp; (4) Lighthouse spot-check `/` + one roadmap.

## Restyle brief for subagents (secondary pages)

Presentation-only. Use tokens/utilities above; no new logic, no route/copy/heading changes. Cards → `.brut-card` (occasionally tilted), primary buttons → `.brut-btn` in acid or electric, section labels → mono uppercase chips, decorative gradients/glass → flat surfaces with thick borders. Both themes must pass contrast (ink on cream / cream on near-black). Never add an opaque full-page wrapper that hides `BrutalBackground`. Respect `prefers-reduced-motion`.
