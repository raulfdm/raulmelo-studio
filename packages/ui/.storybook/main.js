const { configuredConfig } = require('@raulmelo/styles/lib/postcss.config.cjs');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-css-modules-preset',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('../../../node_modules/postcss'),
          postcssOptions: configuredConfig,
        },
      },
    },
  ],
  framework: '@storybook/react',
};
