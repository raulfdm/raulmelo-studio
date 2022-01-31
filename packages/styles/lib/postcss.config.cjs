const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const configuredConfig = {
  plugins: [
    //Some plugins, like postcss-nested, need to run before Tailwind,
    require('tailwindcss'),
    require('tailwindcss/nesting'),
    //But others, like autoprefixer, need to run after,
    require('autoprefixer'),
  ],
};

/**
 * NextJS does not accept postcss pre-configured =,
 */
const flatConfig = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'tailwindcss/nesting': {},
  },
};

if (!dev) {
  configuredConfig.plugins.push(
    require('cssnano')({
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
