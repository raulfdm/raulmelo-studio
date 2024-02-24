/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-astro', 'prettier-plugin-svelte'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
