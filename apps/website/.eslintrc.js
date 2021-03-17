module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:react/recommended', '@sub-tv/eslint-config'],
      plugins: ['react-hooks', 'jest'],
      settings: {
        react: {
          version: 'detect',
        },
        jest: {
          version: 26,
        },
      },
      env: {
        browser: true,
        'jest/globals': true,
      },
      rules: {
        /* This is a NEXTJS project!!11! */
        'react/react-in-jsx-scope': 'off',
        'react/jsx-no-undef': 'off',
        'react/prop-types': 'off',
        camelcase: 'off',
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
