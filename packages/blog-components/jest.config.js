//@ts-nocheck
const defaultConfig = require('../../config/jest.config');

module.exports = {
  ...defaultConfig,
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  snapshotSerializers: ['@emotion/jest/serializer'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.*', // Don't want to test stories
    '!src/**/index.ts', // Don't want to test barrels
  ],
};
