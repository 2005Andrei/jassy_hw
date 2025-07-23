import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'vite-plugin-bundle-analyzer';

export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
    chunkSizeWarningLimit: 1000, // Suppress warnings for now
  },
});
