import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

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
