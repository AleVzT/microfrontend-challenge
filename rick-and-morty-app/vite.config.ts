import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'rickApp',
      filename: 'remoteEntry.js',
      remotes: {
        host: 'http://localhost:5174/assets/remoteEntry.js',
      },
      exposes: {
        './App': './src/App.tsx',
      },
      shared: ['react', 'react-dom', 'styled-components', 'react-i18next', 'i18next'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
  },
  server: {
    port: 5173,
  },
  preview: {
    port: 5173,
  },
});
