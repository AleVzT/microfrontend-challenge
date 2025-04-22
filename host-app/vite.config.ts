import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        rickApp: 'http://localhost:5173/assets/remoteEntry.js',
        potterApp: 'http://localhost:4174/assets/remoteEntry.js',
      },
      exposes: {
        './i18n': './src/i18n/index.ts',
      },
      shared: ['react', 'react-dom', 'styled-components', 'react-i18next', 'i18next'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5174,
  },
  preview: {
    port: 5174,
  },
});