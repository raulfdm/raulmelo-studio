const commons = {
  extends: ['eslint:recommended'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};

const baseTs = {
  parser: '@typescript-eslint/parser',
  plugins: [...commons.plugins, '@typescript-eslint'],
  extends: [...commons.extends, 'plugin:@typescript-eslint/recommended'],
  rules: {
    ...commons.rules,
  },
};

const baseJs = {
  parser: '@babel/eslint-parser',
  /**
   * https://github.com/babel/ember-cli-babel/issues/366#issuecomment-728947041
   */
  parserOptions: {
    requireConfigFile: false,
  },
  extends: [...commons.extends],
  plugins: [...commons.plugins],
  rules: {
    ...commons.rules,
  },
};

module.exports = {
  overrides: [
    /**
     * React TS
     */
    {
      files: ['*.tsx'],
      ...baseTs,
      extends: baseTs.extends.concat('plugin:react/recommended'),
      plugins: baseTs.plugins.concat('react-hooks'),
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        ...baseTs.rules,
        // React 17
        'react/react-in-jsx-scope': 'off',
        // This is TypeScript
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    /**
     * TS Files
     */
    {
      files: ['*.ts'],
      ...baseTs,
    },
    {
      files: ['*.test.*', '**/__test__/*.ts', '**/__test__/*.tsx'],
      ...baseTs,
      rules: {
        ...baseTs.rules,
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',
      },
    },
    /**
     * JavaScript Tests
     */
    {
      files: ['*.test.js', '**/__test__/*.js'],
      ...baseJs,
      plugins: ['jest'],
      env: {
        'jest/globals': true,
      },
    },
    /**
     * Regular JavaScript
     */
    {
      files: ['*.js'],
      ...baseJs,
      env: {
        node: true,
        es6: true,
      },
    },
  ],
  ignorePatterns: ['*.d.ts'],
};
