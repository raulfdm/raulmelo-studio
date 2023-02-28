/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: `@typescript-eslint/parser`,
  extends: [`plugin:@typescript-eslint/recommended`],
  plugins: [`simple-import-sort`],
  rules: {
    '@typescript-eslint/consistent-type-assertions': `error`,
    '@typescript-eslint/consistent-type-imports': [
      `error`,
      { disallowTypeAnnotations: false, fixStyle: `inline-type-imports` },
    ],
    quotes: `off`,
    '@typescript-eslint/quotes': [`error`, `backtick`],

    'no-unused-vars': `off`,
    '@typescript-eslint/no-unused-vars': [
      `warn`,
      { destructuredArrayIgnorePattern: `^_`, varsIgnorePattern: `^Props` },
    ],
    'simple-import-sort/imports': `error`,
    'simple-import-sort/exports': `error`,
    'no-duplicate-imports': `error`,
  },
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: [`*.astro`],
      extends: [`plugin:astro/recommended`],
      // Allows Astro components to be parsed.
      parser: `astro-eslint-parser`,
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: `@typescript-eslint/parser`,
        extraFileExtensions: [`.astro`],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
  ],
};
