import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';

import type { FlatCompatObj } from './configs/type.ts';

export function getFlatCompat(): FlatCompatObj {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
  });

  return compat;
}
