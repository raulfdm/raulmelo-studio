import { defineConfig } from '@raulmelo/eslint-config';
import pluginNode from 'eslint-plugin-node';
import globals from 'globals';

export default defineConfig([
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
]);
