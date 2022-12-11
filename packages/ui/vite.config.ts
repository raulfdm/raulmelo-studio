import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

function isExternal(id: string) {
  /**
   * TODO: I'm bundling the entire refractor library here because Remix
   * is complaining about "requiring" an ESM dependency.
   *
   * I'm not sure how to fix that properly. Probably I'm going to open an issue
   * on Remix and see what they say.
   */
  if (id.startsWith('refractor/')) {
    return false;
  }

  return !id.startsWith('.') && !path.isAbsolute(id);
}

export default defineConfig(() => ({
  plugins: [react()],
  test: {
    clearMocks: true,
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: ['./config/testSetup.ts'],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: isExternal,
    },
  },
}));
