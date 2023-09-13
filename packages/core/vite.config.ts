/// <reference types="vitest" />

import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const aliases = {
  '@/utils': path.resolve(__dirname, './src/utils'),
  '@/config': path.resolve(__dirname, './src/config'),
  '@/domains': path.resolve(__dirname, './src/domains'),
  '@/scripts': path.resolve(__dirname, './src/scripts'),
};

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
  return (
    !id.startsWith('.') &&
    !path.isAbsolute(id) &&
    !Object.keys(aliases).some((alias) => id.startsWith(alias))
  );
}

console.log(process.env);

const config = defineConfig({
  test: {
    globals: true,
    include: ['**/?(*.){test,spec}.?(c|m)[jt]s?(x)'],
  },
  resolve: {
    alias: aliases,
  },
  plugins: [dts()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: process.env.NODE_ENV === 'production',
    lib: {
      entry: {
        domains: path.resolve(__dirname, 'src/domains/index.ts'),
        scripts: path.resolve(__dirname, 'src/scripts/index.ts'),
        utils: path.resolve(__dirname, 'src/utils/index.ts'),
        config: path.resolve(__dirname, 'src/config/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: isExternal,
    },
  },
});

export default config;
