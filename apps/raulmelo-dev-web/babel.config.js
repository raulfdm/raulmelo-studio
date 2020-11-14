module.exports = {
  presets: ['next/babel'],
  env: {
    test: {
      /**
       * Necessary to run tests with jest
       */
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
      ],
    },
  },
};
