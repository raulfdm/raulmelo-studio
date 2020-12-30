module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  snapshotSerializers: ['@emotion/jest/serializer'],
};
