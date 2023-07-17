/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  plugins: [require.resolve('prettier-plugin-astro')],

  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
