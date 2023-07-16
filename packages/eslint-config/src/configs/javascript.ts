import eslintJs from '@eslint/js';
import type { Linter } from 'eslint';

export const javascriptConfig = {
  files: ['**/*.js', '**/*.jsx'],
  rules: eslintJs.configs.recommended.rules,
} satisfies Linter.FlatConfig;
