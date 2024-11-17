import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  plugins: [react()],
});