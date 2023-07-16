import type { Linter } from 'eslint';
import vitestPlugin from 'eslint-plugin-vitest';
import globals from 'globals';

export const vitestConfig = {
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
} satisfies Linter.FlatConfig;
