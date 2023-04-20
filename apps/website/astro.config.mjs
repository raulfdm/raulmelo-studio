import image from '@astrojs/image';
import partytown from '@astrojs/partytown';
import prefetch from '@astrojs/prefetch';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';
import { resolve } from 'import-meta-resolve';
import { loadEnv } from 'vite';

const { VERCEL_ENV, VERCEL_URL } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  ``,
);

console.log(`IDS`, {
  VERCEL_ANALYTICS_ID: import.meta.env.VERCEL_ANALYTICS_ID,
  PUBLIC_VERCEL_ANALYTICS_ID: import.meta.env.PUBLIC_VERCEL_ANALYTICS_ID,
  PROCESS_VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID,
  PROCESS_PUBLIC_VERCEL_ANALYTICS_ID: process.env.PUBLIC_VERCEL_ANALYTICS_ID,
});

import.meta.env.PUBLIC_VERCEL_ANALYTICS_ID = process.env.VERCEL_ANALYTICS_ID;

console.log(`IDS 2`, {
  VERCEL_ANALYTICS_ID: import.meta.env.VERCEL_ANALYTICS_ID,
  PUBLIC_VERCEL_ANALYTICS_ID: import.meta.env.PUBLIC_VERCEL_ANALYTICS_ID,
  PROCESS_VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID,
  PROCESS_PUBLIC_VERCEL_ANALYTICS_ID: process.env.PUBLIC_VERCEL_ANALYTICS_ID,
});

const vscodeOnigurumaPath = new URL(
  `onig.wasm`,
  await resolve(`vscode-oniguruma`, import.meta.url),
).pathname;

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
    includeFiles: [vscodeOnigurumaPath],
  }),
  vite: {
    ssr: {
      external: [`@raulmelo/core`, `@raulmelo/code-highlight`],
    },
  },
};

if (VERCEL_ENV === `production`) {
  config.site = `https://raulmelo.dev`;
} else if (VERCEL_URL) {
  config.site = `https://${VERCEL_URL}`;
}

export default defineConfig(config);
