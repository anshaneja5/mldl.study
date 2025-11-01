import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize state from localStorage, or default to false
    const savedMode = localStorage.getItem('darkMode');    // Default to dark mode on first visit, otherwise respect saved preference.
    return savedMode === null ? true : savedMode === 'true';
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