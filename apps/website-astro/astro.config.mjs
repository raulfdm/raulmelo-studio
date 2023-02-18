import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import react from '@astrojs/react';
import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
  ],
  output: 'server',
  adapter: vercel({}),
  vite: {
    ssr: {
      external: ['@raulmelo/core', '@raulmelo/ui', '@formatjs/intl'],
      noExternal: ['@raulmelo/styles'],
    },
  },
});
