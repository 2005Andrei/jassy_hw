import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    jsxImportSource: 'react',
    babel: {
      presets: ['@babel/preset-react'],
    },
  })],
  build: {
    chunkSizeWarningLimit: 1000,
  },
});

