declare module '@eslint/eslintrc' {
  export class FlatCompat {
    constructor(options: {
      baseDirectory: string;
      resolvePluginsRelativeTo: string;
    });
    config(config: Linter.Config): Linter.FlatConfig[];
  }
}
