import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import react from '@astrojs/react';
import image from '@astrojs/image';

// https://astro.build/config
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://raulmelo.dev',
  integrations: [
    tailwind(),
    react(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    sitemap({
      filter: (page) =>
        !page.url.includes('/404') && !page.url.includes('/search'),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-UK',
          pt: 'pt-BR',
        },
      },
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
