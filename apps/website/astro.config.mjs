import image from '@astrojs/image';
import partytown from '@astrojs/partytown';
import prefetch from '@astrojs/prefetch';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';

/** @type {import('astro').AstroUserConfig} */
const config = {
  site: `http://localhost:3000`,
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
      external: [`@raulmelo/core`, `@raulmelo/code-highlight`],
    },
  },
};

if (process.env.VERCEL_ENV === `production`) {
  config.site = `https://raulmelo.dev`;
} else if (process.env.VERCEL_URL) {
  config.site = `https://${process.env.VERCEL_URL}`;
}

export default defineConfig(config);
