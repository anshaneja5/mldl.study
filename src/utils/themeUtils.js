/**
 * Theme detection utility functions
 * Handles automatic detection of user's browser theme preference
 */

/**
 * Gets the user's browser theme preference
 * @returns {boolean} true if user prefers dark mode, false otherwise
 */
export const getBrowserThemePreference = () => {
  if (typeof window === 'undefined') {
    return false; // Default to light mode on SSR
  }
  
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Gets the current theme setting with priority:
 * 1. User's saved preference in localStorage
 * 2. Browser's theme preference
 * 3. Default to light mode
 * @returns {boolean} true for dark mode, false for light mode
 */
export const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const savedTheme = localStorage.getItem('darkMode');
  
  // If user has previously set a preference, use that
  if (savedTheme !== null) {
    return savedTheme === 'true';
  }
  
  // Otherwise, use browser preference
  return getBrowserThemePreference();
};

/**
 * Applies theme to document and saves preference
 * @param {boolean} isDark - whether to apply dark theme
 * @param {boolean} savePreference - whether to save to localStorage (default: true)
 */
export const applyTheme = (isDark, savePreference = true) => {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.classList.toggle('dark', isDark);
  
  if (savePreference) {
    localStorage.setItem('darkMode', isDark.toString());
  }
};

/**
 * Sets up a listener for browser theme changes
 * @param {Function} callback - function to call when theme changes
 * @returns {Function} cleanup function to remove listener
 */
export const setupThemeListener = (callback) => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {}; // Return empty cleanup function
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (e) => {
    // Only update if user hasn't set a manual preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === null) {
      callback(e.matches);
    }
  };

  // Use the newer addEventListener if available, fallback to addListener
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  } else if (mediaQuery.addListener) {
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }
  
  return () => {}; // Return empty cleanup function if no listener support
};