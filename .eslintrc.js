module.exports = {
  overrides: [
    {
      files: ['*.tsx'],
      extends: ['plugin:react/recommended'],
      plugins: ['react-hooks', 'jest'],
      settings: {
        react: {
          version: 'detect',
        },
        jest: {
          version: 26,
        },
      },
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-no-undef': 'off',
        'react/prop-types': 'off',
      },
    },
    {
      files: ['*.ts'],
      extends: [],
      plugins: ['jest'],
      settings: {
        jest: {
          version: 26,
        },
      },
      env: {
        browser: true,
        'jest/globals': true,
      },
      rules: {
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/explicit-function-return-type': 0,
      },
    },
    /**
     * JavaScript Tests
     */
    {
      files: ['*.test.js', '**/__test__/*.js'],
      extends: ['eslint:recommended'],
      parser: 'babel-eslint',
      env: {
        'jest/globals': true,
      },
    },
    /**
     * Regular JavaScript
     */
    {
      files: ['*.js'],
      env: {
        node: true,
        es6: true,
      },
      extends: ['eslint:recommended'],
      parser: 'babel-eslint',
    },
    {
      extends: ['plugin:jest/recommended'],
      files: ['*.test.*', '**/__tests__/*.ts'],
      env: {
        'jest/globals': true,
        es6: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'jest/no-mocks-import': 'off',
      },
    },
  ],
  ignorePatterns: ['*.d.ts'],
};
