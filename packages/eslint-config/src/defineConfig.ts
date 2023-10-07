import type { Linter } from 'eslint';

import { baseConfig } from './configs/base.ts';
import { javascriptConfig } from './configs/javascript.ts';
import { prettierConfig } from './configs/prettier.ts';
import { typescriptConfig } from './configs/typescript.ts';
import { vitestConfig } from './configs/vitest.ts';
import { maybeArray } from './utils.ts';

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
