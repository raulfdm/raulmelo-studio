import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';

import type { EslintConfigType } from './type.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export const baseConfig = [
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
      'yarn.lock',
    ],
  },
  ...compat.config({
    plugins: ['simple-import-sort'],
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  }),
  ...compat.config({
    extends: ['plugin:import/recommended'],
    plugins: ['import'],
    rules: {
      'import/no-duplicates': [
        'error',
        {
          'prefer-inline': true,
        },
      ],
      'import/no-unresolved': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
    },
  }),
] satisfies EslintConfigType;
