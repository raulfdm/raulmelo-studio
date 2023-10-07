import eslintJs from '@eslint/js';
import type { Linter } from 'eslint';

export const javascriptConfig: Linter.FlatConfig = {
  files: ['**/*.js', '**/*.jsx'],
  rules: eslintJs.configs.recommended.rules,
}
