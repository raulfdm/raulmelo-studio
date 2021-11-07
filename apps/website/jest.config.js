const defaultConfig = require('../../config/jest.config');

module.exports = {
  ...defaultConfig,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  modulePathIgnorePatterns: ['<rootDir>/.next'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/index.ts', // Don't want to test barrels
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '^~/components/(.*)': '<rootDir>/src/components/$1',
    '^~/config/(.*)': '<rootDir>/src/config/$1',
    '^~/contexts/(.*)': '<rootDir>/src/contexts/$1',
    '^~/hooks/(.*)': '<rootDir>/src/hooks/$1',
    '^~/lib/(.*)': '<rootDir>/src/lib/$1',
    '^~/pages/(.*)': '<rootDir>/src/pages/$1',
    '^~/site-data': '<rootDir>/site-data.json',
    '^~/utils/(.*)': '<rootDir>/src/utils/$1',
  },
};
