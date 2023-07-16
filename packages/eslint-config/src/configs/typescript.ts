import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import type { Linter } from 'eslint';

export const typescriptConfig: Linter.FlatConfig = {
  files: ['**/*.ts', '**/*.tsx'],
  plugins: {
    '@typescript-eslint': tsPlugin,
  },
  languageOptions: {
    parser: tsParser as unknown as Linter.ParserModule,
  },
  rules: {
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { disallowTypeAnnotations: false, fixStyle: 'inline-type-imports' },
    ],
  },
};
