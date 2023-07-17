import type { Linter } from 'eslint';

import { baseConfig } from './configs/base.js';
import { javascriptConfig } from './configs/javascript.js';
import { prettierConfig } from './configs/prettier.js';
import { typescriptConfig } from './configs/typescript.js';
import { vitestConfig } from './configs/vitest.js';
import { maybeArray } from './utils.js';

type Options = {
  vitest?: boolean;
  js?: boolean;
  ts?: boolean;
  prettier?: boolean;
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
      ...maybeArray(prettierConfig),
    ];
  }

  const { vitest = false, js = false, ts = false, prettier = false } = options;

  const newConfig: Linter.FlatConfig[] = [...maybeArray(baseConfig)];

  if (js) {
    newConfig.push(...maybeArray(javascriptConfig));
  }

  if (ts) {
    newConfig.push(...maybeArray(typescriptConfig));
  }

  if (vitest) {
    newConfig.push(...maybeArray(vitestConfig));
  }

  newConfig.push(...config);

  /**
   * Prettier always must be the last config
   */
  if (prettier) {
    newConfig.push(...maybeArray(prettierConfig));
  }

  return newConfig;
}
