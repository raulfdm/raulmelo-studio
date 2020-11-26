const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    // Specify the paths to all of the template files
    content: ['./**/*.tsx', './**/*.css', './**/*.ts'],
    // This is the function used to extract class names from the templates
    defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    safelist: ['html', 'body'],
  },
];

module.exports = {
  plugins: [
    'tailwindcss',
    process.env.NODE_ENV === 'production' ? purgecss : undefined,
    'postcss-preset-env',
    'autoprefixer',
  ],
};
