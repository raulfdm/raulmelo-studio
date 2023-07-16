import vitestPlugin from 'eslint-plugin-vitest';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig} */
export default {
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
};
