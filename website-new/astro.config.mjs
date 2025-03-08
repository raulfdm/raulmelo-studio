// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { i18nConfig } from './src/lib/config/locale';

// https://astro.build/config
export default defineConfig({
  // site must be set so the locale routing can work
  get site() {
    let site;

    // On Vercel, they provide a URL via this env var
    // https://vercel.com/docs/projects/environment-variables/system-environment-variables#VERCEL_URL
    if (process.env.VERCEL_URL) {
      site = `https://${process.env.VERCEL_URL}`;
    } else {
      return `http://localhost:4321`;
    }

    return site;
  },
  output: 'server',
  adapter: vercel({
    skewProtection: true,
  }),
  i18n: i18nConfig,
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: [
          '**/.history/**/*',
          '**/playwright-report/**/*',
          '**/test-results/**/*',
        ],
      },
    },
  },
});

function getSite() {}
