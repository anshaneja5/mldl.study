/**
 * Utility functions for theme detection and management
 */

/**
 * Detects the browser's preferred color scheme
 * @returns {boolean} true if dark mode is preferred, false otherwise
 */
export const getBrowserThemePreference = () => {
  // Check if window and matchMedia are available (for SSR compatibility)
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false; // Default to light mode if detection is not available
};

/**
 * Gets the theme preference with the following priority:
 * 1. User's saved preference in localStorage
 * 2. Browser's preferred color scheme
 * 3. Default fallback (light mode)
 * 
 * @returns {boolean} true if dark mode should be used, false otherwise
 */
export const getInitialThemePreference = () => {
  const savedDarkMode = localStorage.getItem('darkMode');
  
  // If user has a saved preference, use it
  if (savedDarkMode !== null) {
    return savedDarkMode === 'true';
  }
  
  // If no saved preference, detect browser preference
  const browserPrefersDark = getBrowserThemePreference();
  
  // Save the detected preference for future visits
  localStorage.setItem('darkMode', browserPrefersDark.toString());
  
  return browserPrefersDark;
};

/**
 * Applies the theme to the document and saves the preference
 * @param {boolean} isDarkMode - Whether dark mode should be enabled
 */
export const applyTheme = (isDarkMode) => {
  document.documentElement.classList.toggle('dark', isDarkMode);
  localStorage.setItem('darkMode', isDarkMode.toString());
};

/**
 * Sets up a listener for browser theme changes
 * @param {Function} callback - Function to call when theme changes
 * @returns {Function} Cleanup function to remove the listener
 */
export const setupThemeChangeListener = (callback) => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only auto-update if user hasn't set a manual preference
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode === null) {
        callback(e.matches);
      }
    };
    
    // Add listener for modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }
  
  return () => {}; // No-op cleanup function
};
