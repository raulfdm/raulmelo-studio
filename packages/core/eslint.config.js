import fullConfig from '@raulmelo/eslint-config/full';
import pluginNode from 'eslint-plugin-node';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...fullConfig,
  {
    plugins: {
      node: pluginNode,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
