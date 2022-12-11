import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: `jsdom`,
    setupFiles: `./setupTest.ts`,
  },
  resolve: {
    alias: {
      $infrastructure: `./app/infrastructure`,
      $ui: `./app/ui`,
      $screens: `./app/screens`,
    },
  },
});
