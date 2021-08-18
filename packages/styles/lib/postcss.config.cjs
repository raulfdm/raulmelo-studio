const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const configuredConfig = {
  plugins: [
    //Some plugins, like postcss-nested, need to run before Tailwind,
    tailwindcss(),
    //But others, like autoprefixer, need to run after,
    autoprefixer(),
  ],
};

/**
 * NextJS does not accept postcss pre-configured =,
 */
const flatConfig = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

if (!dev) {
  configuredConfig.plugins.push(
    cssnano({
      preset: 'default',
    }),
  );

  flatConfig.plugins.cssnano = {
    preset: 'default',
  };
}

module.exports = {
  configuredConfig,
  flatConfig,
};
