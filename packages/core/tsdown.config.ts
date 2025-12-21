import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./intl.ts', './sanity.ts'],
  outDir: './dist',
  dts: true,
  clean: true,
  platform: 'neutral',
});
