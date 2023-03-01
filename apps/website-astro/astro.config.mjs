import image from '@astrojs/image';
import prefetch from '@astrojs/prefetch';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: `https://raulmelo.dev`,
  integrations: [
    tailwind(),
    react(),
    image({
      serviceEntryPoint: `@astrojs/image/sharp`,
    }),
    sitemap({
      filter: (page) =>
        !page.url.includes(`/404`) && !page.url.includes(`/search`),
      i18n: {
        defaultLocale: `en`,
        locales: {
          en: `en-UK`,
          pt: `pt-BR`,
        },
      },
    }),
    robotsTxt({
      policy: [
        {
          userAgent: `*`,
          allow: `/`,
          disallow: [`/search`, `/404`],
        },
      ],
    }),
    prefetch(),
  ],
  output: `server`,
  adapter: vercel({}),
  vite: {
    ssr: {
      external: [`@raulmelo/core`, `@raulmelo/ui`, `@formatjs/intl`],
      noExternal: [`@raulmelo/styles`],
    },
  },
});
