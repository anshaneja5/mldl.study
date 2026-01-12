import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  plugins: [react()],
  server: {
    // Ensure static files like sitemap.xml are served correctly
    middlewareMode: false,
    fs: {
      strict: false,
    },
  },
});