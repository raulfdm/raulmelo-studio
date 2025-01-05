// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import { i18nConfig } from './src/lib/config/locale';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  i18n: i18nConfig,
});
