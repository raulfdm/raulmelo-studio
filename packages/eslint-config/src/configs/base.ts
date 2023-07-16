import type { Linter } from 'eslint';
import simpleSortPlugin from 'eslint-plugin-simple-import-sort';

export const baseConfig = [
  {
    ignores: ['dist/**', 'bin/**', 'cache/**', '**/*.d.ts'],
  },
  {
    plugins: {
      'simple-import-sort': simpleSortPlugin,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
] satisfies Linter.FlatConfig[]
