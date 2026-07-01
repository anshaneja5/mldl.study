# Aurora Glass — page restyle brief

You are restyling ONE existing React page to match an already-built "Aurora Glass" design
system. This is a **presentation-only** change. Do NOT alter logic, state, data loading,
filtering/search/sort, handlers, routes, props, or exports. Only change JSX layout/markup
and classNames/inline styles. Preserve all hooks, `useDarkMode`, localStorage, context
(e.g. `useBookmarks`), `ReactGA`, and `<Helmet>` SEO exactly.

## READ FIRST (the source of truth — match these, don't invent new styles)
- `src/index.css` — design tokens + utility classes you MUST use.
- `src/components/HomePage.jsx` — canonical hero, glass cards, `fadeUp` motion, `SectionShell`.
- `src/components/RoadmapView.jsx` — canonical page shell + header + glass panels + ProgressRing.
- `src/components/AuroraBackground.jsx`, `Navbar.jsx`, `Footer.jsx`, `Modal.jsx`.

## PAGE SHELL — apply to every page
Replace any opaque page background (`bg-gray-50/100/900`, `bg-black`, `bg-slate-*`,
`dark:bg-*`, or `darkMode ? ... : ...` background ternaries) with the shared shell so the
fixed aurora layer shows through. The outer wrapper MUST be transparent.

```jsx
import AuroraBackground from './AuroraBackground';
// keep existing Navbar/Footer/BackToTopButton/useDarkMode imports

return (
  <>
    <Helmet>{/* keep existing SEO untouched */}</Helmet>
    <AuroraBackground />
    <div className="flex min-h-screen flex-col">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-20 pt-10 sm:pt-14">
        {/* page content */}
      </main>
      <Footer darkMode={darkMode} />
    </div>
    {/* keep <BackToTopButton /> if the page already had it */}
  </>
);
```
If the page didn't use `useDarkMode`, add it (`const [darkMode, toggleDarkMode] = useDarkMode();`)
so Navbar's toggle works.

## TOKENS & UTILITIES — use these, never hardcode gray-x / white / dark: text colors
- Text: `text-ink` (primary), `text-soft` (secondary), `text-faint` (tertiary). NOT `text-gray-*`, `text-white`, `dark:text-*`.
- Cards / panels: `glass glass-sheen rounded-3xl` (large) or `rounded-2xl`. Elevated (overlays/menus): `glass-strong glass-sheen`.
- Nested tiles inside a glass card: `rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04]`.
- Dividers/borders: `border-white/10`.
- Primary button / CTA: add class `btn-aurora` plus `rounded-2xl px-6 py-3` (it's pre-styled — gradient, glow, hover). Secondary button: `glass ... text-ink hover:shadow-glow`.
- Inputs / selects: `rounded-2xl glass px-4 py-2.5 text-ink placeholder:text-faint outline-none focus:shadow-glow`.
- Gradient text accent (sparingly — one word in a heading or the logo-ish bits): `text-aurora`.
- Headings (h1–h5) already render in the Sora display font globally; use `font-display` only on non-heading elements meant to look like display, and `font-mono` for numbers/badges/labels.
- Icon orb: `grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-<a> to-<b> text-[#06070f]`.
- Hover lift on cards: `transition-all duration-300 hover:-translate-y-1 hover:shadow-glow`.
- Pills/tags: `rounded-full glass px-3 py-1 text-xs` (active state: `text-aurora` or an accent bg).

## ACCENT PALETTE
`aurora-violet #7c5cff`, `aurora-indigo`, `aurora-blue`, `aurora-cyan #22d3ee`,
`aurora-teal`, `aurora-fuchsia`, `aurora-amber`. Default page accent = violet→cyan.
Per-roadmap accents (use when a card/section maps to a roadmap):
Prereq emerald/teal · ML blue/indigo · DL violet/fuchsia · GenAI amber/orange.

## MOTION (optional, tasteful)
You MAY add framer-motion entrance like HomePage's `fadeUp` (fade + slide-up, small stagger).
Keep it subtle; global CSS already handles `prefers-reduced-motion`. Don't over-animate.

## HARD CONSTRAINTS
- Presentation only. Zero behavior/data/route/export changes.
- Result MUST be valid, compiling JSX. Keep imports you still use; drop ones you stop using.
- Light mode must stay readable — the tokens handle it automatically if you use them.
- Do NOT start a dev server or run the build or any browser tool (the coordinator verifies centrally).

## OUTPUT
Rewrite the target file in place. Return a 2–4 line summary of the visual changes you made.
