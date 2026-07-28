import { loadEnv } from 'vite';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, sharpImageService } from 'astro/config';
import robotsTxt from 'astro-robots-txt';
import { createConfig } from './src/infrastructure/config/create-config';

const config = createConfig(loadEnv(import.meta.env.MODE!, process.cwd(), ''));

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: true,
  site: config.site.url,
  output: 'static',
  redirects: {
    ...config.site.redirects,
    /**
     * Both used to be runtime `Astro.redirect` routes. On a static build they
     * become pre-rendered pages that bounce the visitor via `meta refresh`.
     */
    '/cv': config.cvURL,
    '/admin': `https://${config.sanity.studioHost}.sanity.studio/structure`,
  },
  image: {
    domains: config.site.assetsDomains,
    service: sharpImageService(),
  },
  server:{
    host: true,
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
});