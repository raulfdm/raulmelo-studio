import { loadEnv } from 'vite';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, sharpImageService } from 'astro/config';
import robotsTxt from 'astro-robots-txt';
import { createConfig } from './src/infrastructure/config/create-config';
import node from '@astrojs/node';

const config = createConfig(loadEnv(import.meta.env.MODE!, process.cwd(), ''));

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
  adapter: node({
    mode: 'standalone',
  }),
});