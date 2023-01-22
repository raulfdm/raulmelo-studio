import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: vercel({
    includeFiles: ['middleware.ts'],
  }),
  vite: {
    ssr: {
      external: ['@raulmelo/core'],
      noExternal: ['@raulmelo/ui', '@raulmelo/styles'],
    },
  },
});
