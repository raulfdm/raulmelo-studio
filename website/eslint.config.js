import { defineConfig } from '@raulmelo/eslint-config';
import tslintParser from '@typescript-eslint/parser';
import astroParser from 'astro-eslint-parser';
import astroPlugin from 'eslint-plugin-astro';

export default defineConfig([
  {
    // TODO: update this
    ignores: ['**/*.cjs'],
  },
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
