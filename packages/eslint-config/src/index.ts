import { FlatCompat } from '@eslint/eslintrc';
import type { Linter } from 'eslint';
import path from 'path';
import { fileURLToPath } from 'url';

import { baseConfig } from './configs/base.js';
import { javascriptConfig } from './configs/javascript.js';
import type { FlatCompatObj } from './configs/type.js';
import { typescriptConfig } from './configs/typescript.js';
import { vitestConfig } from './configs/vitest.js';

type Options = {
  vitest?: boolean;
  js?: boolean;
  ts?: boolean;
};

export function defineConfig(
  config: Linter.FlatConfig[] = [],
  options?: Options,
): Linter.FlatConfig[] {
  /**
   * If no options are passed, returns "full config"
   */
  if (!options) {
    return [
      ...maybeArray(baseConfig),
      ...maybeArray(javascriptConfig),
      ...maybeArray(typescriptConfig),
      ...maybeArray(vitestConfig),
      ...config,
    ];
  }

  const { vitest = false, js = false, ts = false } = options;

  const newConfig: Linter.FlatConfig[] = [...baseConfig];

  if (js) {
    newConfig.push(...maybeArray(javascriptConfig));
  }

  if (ts) {
    newConfig.push(...maybeArray(typescriptConfig));
  }

  if (vitest) {
    newConfig.push(...maybeArray(vitestConfig));
  }

  return [...newConfig, ...config];
}

export function getFlatCompat(): FlatCompatObj {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
  });

  return compat;
}

function maybeArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
