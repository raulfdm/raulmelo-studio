/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  modulePathIgnorePatterns: ['.history'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};
