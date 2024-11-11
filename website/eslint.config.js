// @ts-check
import * as path from 'node:path';
import * as url from 'node:url';
import eslintPluginAstro from 'eslint-plugin-astro';

import createConfig from '@raulmelo/eslint-config';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sharedConfigs = createConfig(__dirname);

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...sharedConfigs,
  ...eslintPluginAstro.configs['flat/recommended'],
];
