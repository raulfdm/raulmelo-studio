import path from 'path';
import { defineConfig } from 'vite';

function isExternal(id: string) {
  return !id.startsWith('.') && !path.isAbsolute(id);
}

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: isExternal,
    },
  },
});
