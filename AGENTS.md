# AGENTS.md

## Cursor Cloud specific instructions

MLDL.Study is a **frontend-only React 18 + Vite 5 SPA** (package name `ml-roadmap-app`). There is no backend, database, or API server — all content is bundled from JS data files at the repo root (`categorized*Content.js`) and static JSON under `public/data/questions/`.

### Services

Only one service exists: the Vite dev server.

- Run it with `npm run dev` (serves at `http://localhost:5173`). Standard scripts live in `package.json`.
- The update script already runs `npm install`, so dependencies are present on startup.

### Non-obvious caveats

- `npm run lint` currently fails with ~193 **pre-existing** ESLint errors (mostly `react/prop-types` and `no-unused-vars`) that are unrelated to environment setup. A clean `eslint .` exit is not expected on `main`.
- `npm run build` runs `vite build` then `node scripts/prerender-seo.mjs`. The prerender step depends on `dist/index.html` produced by the build, so do not run `scripts/prerender-seo.mjs` standalone without first building.
- No `.env` is required. Optional Vite vars (prefix `VITE_APP_`): `VITE_APP_GA_TRACKING_ID` (analytics, off when unset) and `VITE_APP_QUESTIONS_BASE_PATH` (defaults to `/data/questions`).
