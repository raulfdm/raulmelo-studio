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

const vscodeOnigurumaPath = new URL(
  `onig.wasm`,
  resolve(`vscode-oniguruma`, import.meta.url),
).pathname;

/** @type {import('astro').AstroUserConfig} */
const config = {
  site: `http://localhost:3000`,
  output: `server`,
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
  config.site = `https://www.raulmelo.me`;
} else if (VERCEL_URL) {
  config.site = `https://${VERCEL_URL}`;
}

export default defineConfig(config);
