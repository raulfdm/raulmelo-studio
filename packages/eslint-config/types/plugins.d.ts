declare module 'eslint-plugin-simple-import-sort' {
  import type { Linter } from 'eslint';

  const simpleSortPlugin: Linter.Plugin;
  export default simpleSortPlugin;
}

declare module 'eslint-plugin-vitest' {
  import type { Linter } from 'eslint';

  const vitestPlugin: Linter.Plugin;
  export default vitestPlugin;
}

declare module '@typescript-eslint/eslint-plugin/dist/configs/recommended-type-checked.js' {
  import type { Linter } from 'eslint';

  const tslintRecommended: Linter.FlatConfig;
  export default tslintRecommended;
}
