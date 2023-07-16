import eslintJs from '@eslint/js';

/** @type {import('eslint').Linter.FlatConfig} */
export default {
  files: ['**/*.js', '**/*.jsx'],
  rules: eslintJs.configs.recommended.rules,
};
