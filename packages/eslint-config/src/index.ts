import type { Linter } from 'eslint';

import { baseConfig } from './configs/base.js';
import { javascriptConfig } from './configs/javascript.js';
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

function maybeArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
