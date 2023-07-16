import { defineConfig } from '@raulmelo/eslint-config';
import astroParser from 'astro-eslint-parser';
import tslintParser from '@typescript-eslint/parser';
import astroPlugin from 'eslint-plugin-astro';

export default defineConfig([
  {
    files: ['**/*.astro'],
    plugins: {
      astro: astroPlugin,
    },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tslintParser,
        extraFileExtensions: [`.astro`],
      },
    },
  },
]);
