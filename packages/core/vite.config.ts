/// <reference types="vitest" />

import path from 'path';
import { defineConfig } from 'vite';

/**
 * This function receives the full import path and we can determine
 * if it's an external module or not.
 *
 * It's VERY important here to also consider the aliases we've defined, otherwise
 * it'll be also considered as "external" and the resolve.alias won't work at all.
 */
function isExternal(id: string) {
  /**
   * I actually want to bundle up ramda utilities
   */
  if (id.startsWith('ramda/')) {
    return false;
  }
  return !id.startsWith('.') && !path.isAbsolute(id) && !id.startsWith('~/');
}

const config = defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      $utils: path.resolve(__dirname, './src/utils/index.ts'),
      $config: path.resolve(__dirname, './src/config/'),
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      fileName: '[name]',
      entry: {
        core: path.resolve(__dirname, 'src/index.ts'),
        scripts: path.resolve(__dirname, 'src/scripts/index.ts'),
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: isExternal,
    },
  },
});

export default config;
