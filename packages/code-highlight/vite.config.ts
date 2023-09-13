/// <reference types="vitest" />

import path from 'node:path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

function isExternal(id: string) {
  return !id.startsWith('.') && !path.isAbsolute(id);
}

export default defineConfig({
  plugins: [dts()],
  build: {
    target: 'node18',
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: process.env.NODE_ENV === 'production',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: isExternal,
    },
  },
});
