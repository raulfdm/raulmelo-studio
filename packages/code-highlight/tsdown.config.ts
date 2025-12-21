import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: './src/index.ts',
  outDir: './dist',
  dts: true,
  clean: true,
  platform: 'node',
  format: 'esm',
});
