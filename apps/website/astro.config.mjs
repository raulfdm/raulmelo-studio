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

const { VERCEL_ENV, VERCEL_URL, VERCEL_ANALYTICS_ID } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  ``,
);

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
    /**
     * A workaround for enabling Speed Analytics.
     *
     * Vercel injects the `VERCEL_ANALYTICS_ID` env variable but this one is never exposed
     * to the client due to the Astro's restriction of exposing only the `PUBLIC_*` prefixed env vars.
     */
    define: {
      'import.meta.env.VERCEL_ANALYTICS_ID': VERCEL_ANALYTICS_ID,
    },
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
