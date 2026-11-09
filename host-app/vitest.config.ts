import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const stub = (file: string) => fileURLToPath(new URL(`./src/test/${file}`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Federated specifiers do not exist on disk; map each one to its own stub
    // (one file per remote, so vi.mock() can override them independently).
    alias: {
      'rickApp/App': stub('rickAppStub.tsx'),
      'potterApp/App': stub('potterAppStub.tsx'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
