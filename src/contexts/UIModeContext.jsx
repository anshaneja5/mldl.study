import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { syncCanvasBg } from '../theme';

// 'brutal' = the current neo-brutalist site (default, what crawlers see).
// 'legacy' = the pre-revamp Aurora Glass UI, kept as a frozen snapshot.
const STORAGE_KEY = 'mldlUiMode';
const UIModeContext = createContext({ mode: 'brutal', setMode: () => {}, toggle: () => {} });

const readInitialMode = () => {
  if (typeof window === 'undefined') return 'brutal';
  return window.localStorage.getItem(STORAGE_KEY) === 'legacy' ? 'legacy' : 'brutal';
};

// The Aurora Glass UI needs Sora + Hanken Grotesk. Those fonts are not
// loaded on brutal (default) pages, so we inject the stylesheet lazily the
// first time legacy mode is entered — keeping the default/SEO pages lean.
const LEGACY_FONTS_ID = 'legacy-fonts';
const ensureLegacyFonts = () => {
  if (typeof document === 'undefined' || document.getElementById(LEGACY_FONTS_ID)) return;
  const link = document.createElement('link');
  link.id = LEGACY_FONTS_ID;
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap';
  document.head.appendChild(link);
};

export const UIModeProvider = ({ children }) => {
  const [mode, setModeState] = useState(readInitialMode);

  useEffect(() => {
    const isLegacy = mode === 'legacy';
    document.documentElement.classList.toggle('legacy', isLegacy);
    if (isLegacy) ensureLegacyFonts();
    syncCanvasBg();
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const setMode = useCallback((next) => {
    setModeState(next === 'legacy' ? 'legacy' : 'brutal');
    // Jump to the top so the swapped-in UI starts clean.
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }, []);

  const toggle = useCallback(() => {
    setModeState((m) => (m === 'legacy' ? 'brutal' : 'legacy'));
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }, []);

  return (
    <UIModeContext.Provider value={{ mode, setMode, toggle }}>
      {children}
    </UIModeContext.Provider>
  );
};

export const useUIMode = () => useContext(UIModeContext);
