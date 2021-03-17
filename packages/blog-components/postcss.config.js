const config = {
  plugins: [
    require('tailwindcss'),
    require('postcss-preset-env'),
    require('autoprefixer'),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.purgecss = [
    require('@fullhuman/postcss-purgecss'),
    {
      // Specify the paths to all of the template files
      content: ['./**/*.tsx', './**/*.css', './**/*.ts'],
      // This is the function used to extract class names from the templates
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    },
  ];
}

module.exports = config;
