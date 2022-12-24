import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs'],
      fileName: '[name]',
    },
    rollupOptions: {
      external: [
        '@raulmelo/core',
        '@raulmelo/ui',
        '@sanity/vision',
        'react',
        'sanity-plugin-media',
        'sanity',
        'sanity/desk',
      ],
      output: {
        preserveModules: true,
      },
    },
  },
});
