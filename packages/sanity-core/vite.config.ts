import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

function isExternal(id: string) {
  return !id.startsWith('.') && !path.isAbsolute(id);
}

export default defineConfig({
  plugins: [
    dts({
      entryRoot: 'src',
    }),
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: isExternal,
    },
  },
});
