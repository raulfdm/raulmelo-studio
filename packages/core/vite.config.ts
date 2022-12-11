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

type LibTypes = 'core' | 'scripts';

const LIB: LibTypes = (process.env.LIB as LibTypes) ?? 'core';

const libConfig: Record<LibTypes, { entry: string; fileName: string }> = {
  core: {
    entry: path.resolve(__dirname, 'src/index.ts'),
    fileName: 'core',
  },
  scripts: {
    entry: path.resolve(__dirname, 'src/scripts/index.ts'),
    fileName: 'scripts',
  },
};

const currentConfig = libConfig[LIB];

const config = defineConfig(() => ({
  test: {
    globals: true,
  },
  resolve: {
    alias: [
      {
        find: /^~\/utils/,
        replacement: path.resolve(__dirname, './src/utils/index.ts'),
      },
      {
        find: /^~\/config/,
        replacement: path.resolve(__dirname, './src/config/'),
      },
    ],
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      fileName: currentConfig.fileName,
      entry: currentConfig.entry,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: isExternal,
    },
  },
}));

export default config;
