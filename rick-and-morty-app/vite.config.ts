import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

const PORT = 5173;

export default defineConfig(({ mode }) => {
  // The host URL is only needed when this remote runs standalone (it consumes
  // the host's i18n instance). Override it via .env (see .env.example).
  const env = loadEnv(mode, '.', 'VITE_');

  return {
    plugins: [
      react(),
      federation({
        name: 'rickApp',
        filename: 'remoteEntry.js',
        remotes: {
          host: env.VITE_HOST_REMOTE_URL || 'http://localhost:5174/assets/remoteEntry.js',
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
    // Fixed ports: the host references this remote by URL.
    server: { port: PORT, strictPort: true },
    preview: { port: PORT, strictPort: true },
  };
});
