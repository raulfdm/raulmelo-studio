import eslintJs from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import simpleSortPlugin from 'eslint-plugin-simple-import-sort';
import vitestPlugin from 'eslint-plugin-vitest';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['dist/**', 'bin/**', 'cache/**', '**/*.d.ts'],
  },

  {
    files: ['**/*.js', '**/*.jsx'],
    rules: eslintJs.configs.recommended.rules,
  },
  /**
   * General ESLint rules
   */
  {
    plugins: {
      'simple-import-sort': simpleSortPlugin,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  /**
   * TypeScript-specific rules
   */
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { disallowTypeAnnotations: false, fixStyle: 'inline-type-imports' },
      ],
    },
  },

  /**
   * Vitest-specific rules
   */
  {
    files: [
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/__tests__/**',
    ],
    plugins: {
      vitest: vitestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        it: 'readonly',
      },
    },
  },
];
