/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    exclude: ['node_modules', '.git', '.cache', 'e2e'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    reporters: 'verbose',
    watch: false,
  },
});
