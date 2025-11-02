import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if window is defined to avoid SSR errors.
    if (typeof window === 'undefined') {
      // On the server, we can't access localStorage. Default to dark mode.
      return true;
    }

    // On the client, initialize state from localStorage.
    const savedMode = window.localStorage.getItem('darkMode');
    // Default to dark mode on a first visit (when savedMode is null).
    return savedMode === null ? true : savedMode === 'true'; // savedMode is a string
  });

  useEffect(() => {
    // Update class on <html> and save to localStorage when darkMode changes
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return [darkMode, toggleDarkMode];
};

export default useDarkMode;