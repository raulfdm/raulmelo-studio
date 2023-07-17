declare module '@eslint/eslintrc' {
  import type { Linter } from 'eslint';

  class FlatCompatClass {
    constructor(options: {
      baseDirectory: string;
      resolvePluginsRelativeTo: string;
    });

    config(config: Linter.Config): Linter.FlatConfig[];
    env(env: Linter.Config['env']): Linter.FlatConfig[];
    plugins(plugins: Linter.Config['plugins']): Linter.FlatConfig[];
    extends(configToExtend: Linter.Config['extends']): Linter.FlatConfig[];
  }

  export class FlatCompat extends FlatCompatClass {}
}
