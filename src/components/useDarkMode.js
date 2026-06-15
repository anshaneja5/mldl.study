import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if window is defined to avoid SSR errors.
    if (typeof window === 'undefined') {
      // On the server, we can't access localStorage. Default to dark mode.
      return true;
    }

    // On the client, initialize state from localStorage or browser preference.
    const savedMode = window.localStorage.getItem('darkMode');

    if (savedMode !== null) {
      // User has explicitly set a preference
      return savedMode === 'true';
    } else {
      // No saved preference - check browser's preferred color scheme
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  useEffect(() => {
    // Update class on <html> when darkMode changes
    document.documentElement.classList.toggle('dark', darkMode);
    // Keep the canvas color in sync (the pre-paint inline style overrides CSS)
    document.documentElement.style.backgroundColor = darkMode ? '#060713' : '#f6f7fb';

    // Save to localStorage when user explicitly toggles
    // (not on initial load from browser preference)
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null || darkMode !== window.matchMedia('(prefers-color-scheme: dark)').matches) {
      localStorage.setItem('darkMode', String(darkMode));
    }
  }, [darkMode]);

  useEffect(() => {
    // Listen for changes to browser theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleThemeChange = (e) => {
      // Only auto-switch if user hasn't set an explicit preference
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return [darkMode, toggleDarkMode];
};

export default useDarkMode;