const baseTs = {
  parser: '@typescript-eslint/parser',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
};

const baseJs = {
  parser: 'babel-eslint',
  extends: ['eslint:recommended'],
};

module.exports = {
  overrides: [
    /**
     * TS Files
     */
    {
      files: ['*.ts'],
      ...baseTs,
    },
    {
      files: ['*.test.ts', '**/__test__/**.ts'],
      ...baseTs,
      rules: {
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
