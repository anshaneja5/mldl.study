// Single source of truth for the <html> canvas background color.
//
// Two independent concerns write to document.documentElement:
//   - dark mode (useDarkMode) toggles the `dark` class
//   - UI mode (UIModeContext) toggles the `legacy` class
// Both call syncCanvasBg() AFTER updating their class, so the inline
// background-color (which the pre-paint boot script sets and which wins
// over the stylesheet) always matches whichever classes are currently on
// <html> — no matter which effect ran last.

export const CANVAS = {
  brutal: { light: '#fff4e0', dark: '#0d0d0d' },
  legacy: { light: '#f6f7fb', dark: '#060713' },
};

export function syncCanvasBg() {
  if (typeof document === 'undefined') return;
  const el = document.documentElement;
  const isDark = el.classList.contains('dark');
  const isLegacy = el.classList.contains('legacy');
  const set = isLegacy ? CANVAS.legacy : CANVAS.brutal;
  el.style.backgroundColor = isDark ? set.dark : set.light;
}
