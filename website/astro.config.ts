import { loadEnv } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import { defineConfig, sharpImageService } from 'astro/config';
import robotsTxt from 'astro-robots-txt';
import { resolve } from 'import-meta-resolve';
import { createConfig } from './src/infrastructure/config/create-config';

const config = createConfig(loadEnv(import.meta.env.MODE!, process.cwd(), ''));

const configFiles = fs
  .readdirSync('./config', { withFileTypes: true })
  .map((f) => path.resolve(process.cwd(), `./config/${f.name}`));

const vscodeOnigurumaPath = new URL(
  `onig.wasm`,
  resolve(`vscode-oniguruma`, import.meta.url),
).pathname;

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: true,
  site: config.site.url,
  output: 'server',
  redirects: config.site.redirects,
  image: {
    domains: config.site.assetsDomains,
    service: sharpImageService(),
  },
  integrations: [
    partytown(),
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
    includeFiles: [vscodeOnigurumaPath, ...configFiles],
    imageService: true,
    imagesConfig: {
      domains: config.site.assetsDomains,
      sizes: [320, 640, 768, 1024, 1280],
    },
    isr: config.site.isr,
  }),
});
