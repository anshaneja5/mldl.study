/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Archivo Black"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Theme-adaptive (resolve via CSS custom properties)
        ink: 'var(--ink)',
        surface: 'var(--surface)',
        'surface-soft': 'var(--surface-soft)',
        canvas: 'var(--bg)',
        // Loud accents (fixed across themes; pair with black borders/text)
        acid: '#c6ff00',
        electric: '#3300ff',
        'hot-pink': '#ff2e88',
        'cyber-yellow': '#ffd400',
        // Pastel fills (theme-adaptive)
        'pastel-pink': 'var(--pastel-pink)',
        'pastel-blue': 'var(--pastel-blue)',
        'pastel-yellow': 'var(--pastel-yellow)',
        'pastel-mint': 'var(--pastel-mint)',
      },
      boxShadow: {
        brut: '6px 6px 0 0 var(--shadow-color)',
        'brut-sm': '4px 4px 0 0 var(--shadow-color)',
        'brut-lg': '10px 10px 0 0 var(--shadow-color)',
        'brut-xl': '14px 14px 0 0 var(--shadow-color)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        wobble: {
          '0%,100%': { transform: 'rotate(6deg)' },
          '50%': { transform: 'rotate(12deg)' },
        },
        'stamp-in': {
          '0%': { opacity: '0', transform: 'scale(1.4) rotate(-4deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 26s linear infinite',
        wobble: 'wobble 4.5s ease-in-out infinite',
        'stamp-in': 'stamp-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'fade-up': 'fade-up 0.5s ease-out both',
        'scale-in': 'scale-in 0.3s ease-out both',
        blink: 'blink 1s steps(1) infinite',
      },
    },
  },
  plugins: [],
};
