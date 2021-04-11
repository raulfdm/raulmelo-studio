module.exports = {
  presets: [require('@raulfdm/blog-tailwind-preset')],
  mode: 'jit',
  purge: ['./src/**/*', './.storybook', './static/**/*'],
};
