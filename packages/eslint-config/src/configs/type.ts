import type { Linter } from 'eslint';

export type EslintConfigType = Linter.FlatConfig | Linter.FlatConfig[];

export type FlatCompatObj = {
  config(config: Linter.Config): Linter.FlatConfig[];
  env(env: Linter.Config['env']): Linter.FlatConfig[];
  plugins(plugins: Linter.Config['plugins']): Linter.FlatConfig[];
  extends(configToExtend: Linter.Config['extends']): Linter.FlatConfig[];
};
