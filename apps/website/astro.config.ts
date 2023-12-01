import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig, sharpImageService } from 'astro/config';
import robotsTxt from 'astro-robots-txt';
import { resolve } from 'import-meta-resolve';
import { loadEnv } from 'vite';

const { VERCEL_ENV, VERCEL_URL } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  ``,
);

const assetsDomains: string[] = [
  `res.cloudinary.com`,
  `miro.medium.com`,
  `media.giphy.com`,
  `cdn.sanity.io`,
  `sanity.io`,
];

const vscodeOnigurumaPath = new URL(
  `onig.wasm`,
  resolve(`vscode-oniguruma`, import.meta.url),
).pathname;

const config = defineConfig({
  prefetch: true,
  site: getWebsiteUrl(),
  output: `server`,
  redirects: {
    '/uses': '/en/blog/uses',
    '/pt/uses': '/pt/blog/uses',
    '/en/uses': '/en/blog/uses',
  },
  image: {
    domains: assetsDomains,
    service: sharpImageService(),
  },
  integrations: [
    partytown(),
    tailwind(),
    react(),
    robotsTxt({
      policy: [
        {
          userAgent: `*`,
          allow: `/`,
          disallow: [`/search`, `/404`],
        },
      ],
    }),
    svelte(),
  ],
  adapter: vercel({
    functionPerRoute: false,
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
    includeFiles: [vscodeOnigurumaPath],
    imageService: true,
    imagesConfig: {
      domains: assetsDomains,
      sizes: [320, 640, 768, 1024, 1280],
    },
  }),
  vite: {
    ssr: {
      external: [`@raulmelo/core`, `@raulmelo/code-highlight`],
    },
  },
});

function getWebsiteUrl() {
  if (VERCEL_ENV === `production`) {
    return `https://www.raulmelo.me`;
  } else if (VERCEL_URL) {
    return `https://${VERCEL_URL}`;
  } else {
    return `http://localhost:4321`;
  }
}

export default config;
