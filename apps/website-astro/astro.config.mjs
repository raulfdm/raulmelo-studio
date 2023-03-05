import image from '@astrojs/image';
import prefetch from '@astrojs/prefetch';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';

let site = `https://localhost:3000`;

if (process.env.VERCEL_URL) {
  site = `https://${process.env.VERCEL_URL}`;
}

// https://astro.build/config
export default defineConfig({
  site,
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
    svelte(),
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
