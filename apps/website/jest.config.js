const defaultConfig = require('../../config/jest.config');

module.exports = {
  ...defaultConfig,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.*', // Don't want to test stories
    '!src/**/index.ts', // Don't want to test barrels
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '^@components/(.*)': '<rootDir>/src/components/$1',
    '^@config/(.*)': '<rootDir>/src/config/$1',
    '^@contexts/(.*)': '<rootDir>/src/contexts/$1',
    '^@data/(.*)': '<rootDir>/src/data/$1',
    '^@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '^@lib/(.*)': '<rootDir>/src/lib/$1',
    '^@screens/(.*)': '<rootDir>/src/screens/$1',
    '^@services/(.*)': '<rootDir>/src/services/$1',
    '^@styles/(.*)': '<rootDir>/src/styles/$1',
    '^@types-app': '<rootDir>/src/types/index.ts',
    '^@site-data': '<rootDir>/site-data.json',
    '^@utils/(.*)': '<rootDir>/src/utils/$1',
  },
};
