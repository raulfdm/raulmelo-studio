// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import { i18nConfig } from './src/lib/config/locale';

// https://astro.build/config
export default defineConfig({
  get site() {
    let site;

    if (process.env.VERCEL_URL) {
      site = process.env.VERCEL_URL;
    } else {
      return `http://localhost:4321`;
    }

    return site;
  },
  output: 'server',
  adapter: vercel(),
  i18n: i18nConfig,
  vite: {
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
