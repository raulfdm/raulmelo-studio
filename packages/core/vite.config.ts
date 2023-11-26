import * as path from 'node:path';
import * as url from 'node:url';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsPaths from 'vite-tsconfig-paths';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    tsPaths({
      root: __dirname,
    }),
    dts({
      tsconfigPath: './tsconfig.build.json',
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, './dist'),
    lib: {
      formats: ['es'],
      entry: {
        'src/config/index': path.resolve(__dirname, './src/config/index.ts'),
        'src/domains/index': path.resolve(__dirname, './src/domains/index.ts'),
        'src/scripts/index': path.resolve(__dirname, './src/scripts/index.ts'),
        'src/utils/index': path.resolve(__dirname, './src/utils/index.ts'),
      },
    },
    rollupOptions: {
      external: isExternal,
    },
  },
});

function isExternal(id: string) {
  const isAlias = id.startsWith('@/');
  const isRamda = id.startsWith('ramda');

  return !isRamda && !isAlias && !id.startsWith('.') && !path.isAbsolute(id);
}
