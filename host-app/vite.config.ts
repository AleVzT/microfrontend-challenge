import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

const PORT = 5174;

export default defineConfig(({ mode }) => {
  // Remote URLs are resolved at build time. Defaults match the local ports used
  // by `npm start`; override them (see .env.example) to point at deployed remotes.
  const env = loadEnv(mode, '.', 'VITE_');

  return {
    plugins: [
      react(),
      federation({
        name: 'host',
        remotes: {
          rickApp: env.VITE_RICK_REMOTE_URL || 'http://localhost:5173/assets/remoteEntry.js',
          potterApp: env.VITE_POTTER_REMOTE_URL || 'http://localhost:4174/assets/remoteEntry.js',
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
    // Module Federation relies on fixed URLs: fail fast instead of silently
    // switching to another port when this one is taken.
    server: { port: PORT, strictPort: true },
    preview: { port: PORT, strictPort: true },
  };
});
