module.exports = {
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  prettierPath: '../../node_modules/prettier',
  snapshotSerializers: ['jest-serializer-html-string'],
  transformIgnorePatterns: ['node_modules/(?!@unist-util-visit)/'],
};
