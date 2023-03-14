import image from '@astrojs/image';
import partytown from '@astrojs/partytown';
import prefetch from '@astrojs/prefetch';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';

/** @type {Parameters<typeof defineConfig>[0];} */
const config = {
  integrations: [
    partytown(),
    tailwind(),
    react(),
    image({
      serviceEntryPoint: `@astrojs/image/sharp`,
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
  adapter: vercel({
    analytics: true,
  }),
  vite: {
    ssr: {
      external: [`@raulmelo/core`, `@raulmelo/ui`],
    },
  },
};

if (process.env.VERCEL_ENV === `production`) {
  config.site = `https://raulmelo-astro.vercel.app`;
} else if (process.env.VERCEL_URL) {
  config.site = `https://${process.env.VERCEL_URL}`;
}

export default defineConfig(config);
