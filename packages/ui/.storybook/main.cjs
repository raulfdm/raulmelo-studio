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
          /**
           * Because postcss is installed globally, I have to manually require
           * it at the top-level node_modules.
           */
          implementation: require('postcss'),
          /**
           * It's necessary to pass the POSTCSS options here instead a file in
           * the root of this package because for some reason, storybook's
           * postcss does not consider all my options there, leading to uncompiled
           * CSS (e.g., tailwind styles without being parsed.)
           */
          postcssOptions: configuredConfig,
        },
      },
    },
  ],
  framework: '@storybook/react',
  async webpackFinal(config) {
    config.module.rules.push({
      test: /.storybook\/preview.js/,
      resolve: { fullySpecified: false },
    });
    return config;
  },
};
