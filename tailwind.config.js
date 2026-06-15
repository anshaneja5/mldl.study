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
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        aurora: {
          violet: '#7c5cff',
          indigo: '#6366f1',
          blue: '#3b82f6',
          cyan: '#22d3ee',
          teal: '#2dd4bf',
          fuchsia: '#e879f9',
          amber: '#fbbf24',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        glow: '0 8px 30px -10px rgba(124,92,255,0.45)',
        'glow-lg': '0 0 50px -8px rgba(124,92,255,0.5), 0 0 90px -28px rgba(34,211,238,0.4)',
        'glow-cyan': '0 8px 30px -10px rgba(34,211,238,0.5)',
        glass: '0 20px 60px -22px rgba(2,4,16,0.7)',
        'inner-top': 'inset 0 1px 0 0 rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'grid-dark':
          'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
        'grid-light':
          'linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '44px 44px',
      },
      keyframes: {
        'aurora-1': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(7%,-5%) scale(1.18)' },
          '66%': { transform: 'translate(-5%,7%) scale(0.92)' },
        },
        'aurora-2': {
          '0%,100%': { transform: 'translate(0,0) scale(1.08)' },
          '33%': { transform: 'translate(-9%,6%) scale(0.9)' },
          '66%': { transform: 'translate(6%,-8%) scale(1.22)' },
        },
        'aurora-3': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(5%,5%) scale(1.15)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        flow: {
          to: { strokeDashoffset: '-24' },
        },
        'glow-pulse': {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'border-spin': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'aurora-1': 'aurora-1 19s ease-in-out infinite',
        'aurora-2': 'aurora-2 24s ease-in-out infinite',
        'aurora-3': 'aurora-3 30s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'scale-in': 'scale-in 0.55s cubic-bezier(0.22,1,0.36,1) both',
        shimmer: 'shimmer 7s linear infinite',
        flow: 'flow 1.1s linear infinite',
        'glow-pulse': 'glow-pulse 3.2s ease-in-out infinite',
        'spin-slow': 'spin-slow 16s linear infinite',
        'border-spin': 'border-spin 6s linear infinite',
      },
    },
  },
  plugins: [],
};
