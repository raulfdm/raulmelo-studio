// @ts-check
import eslintPluginAstro from 'eslint-plugin-astro';

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '.DS_Store',
      '.env.*',
      '**/*.d.ts',
      '**/*.typegen.ts',
      'bin/**',
      'build/**',
      'cache/**',
      'dist/**',
      'node_modules/**',
      '.turbo/**',
      '.history/**',
      '.svelte-kit/**',
      '.vercel/**',
      'package-lock.json',
      'pnpm-lock.yaml',
    ],
  },
  eslint.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  /**
   * Custom ts rules
   */
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { destructuredArrayIgnorePattern: '^_', varsIgnorePattern: '^Props' },
      ],
    },
  },
  ...eslintPluginAstro.configs.recommended,
);
