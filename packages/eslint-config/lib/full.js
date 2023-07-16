import baseConfig from './base.js';
import javascriptConfig from './javascript.js';
import typescriptConfig from './typescript.js';
import vitestConfig from './vitest.js';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  vitestConfig,
  javascriptConfig,
  typescriptConfig,
];
