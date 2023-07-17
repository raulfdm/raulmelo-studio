import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

import type { EslintConfigType } from './type.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export const baseConfig = [
  {
    ignores: ['dist/**', 'bin/**', 'cache/**', '**/*.d.ts'],
  },
  ...compat.config({
    plugins: ['simple-import-sort'],
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  }),
] satisfies EslintConfigType;
