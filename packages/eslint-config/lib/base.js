import simpleSortPlugin from 'eslint-plugin-simple-import-sort';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
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
];
