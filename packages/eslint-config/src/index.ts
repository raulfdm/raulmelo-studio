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
  config: Linter.FlatConfig[],
  options: Options = {},
): Linter.FlatConfig[] {
  const { vitest = false, js = false, ts = false } = options;

  const newConfig: Linter.FlatConfig[] = [...baseConfig];

  if (js) {
    newConfig.push(javascriptConfig);
  }

  if (ts) {
    newConfig.push(typescriptConfig);
  }

  if (vitest) {
    newConfig.push(vitestConfig);
  }

  return [...newConfig, ...config];
}
