module.exports = {
  root: true,
  parser: `@typescript-eslint/parser`,
  extends: [`plugin:astro/recommended`],
  plugins: [`@typescript-eslint`, `simple-import-sort`],
  rules: {
    '@typescript-eslint/consistent-type-assertions': `error`,
    '@typescript-eslint/consistent-type-imports': [
      `error`,
      { disallowTypeAnnotations: false, fixStyle: `inline-type-imports` },
    ],
    quotes: [`error`, `backtick`],
    'no-unused-vars': `off`,
    '@typescript-eslint/no-unused-vars': [
      `warn`,
      { destructuredArrayIgnorePattern: `^_` },
    ],
    'simple-import-sort/imports': `error`,
    'simple-import-sort/exports': `error`,
  },
  overrides: [
    {
      files: [`*.astro`],
      parser: `astro-eslint-parser`,
      // Parse the script in '.astro' as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: `@typescript-eslint/parser`,
        extraFileExtensions: [`.astro`],
      },
    },
  ],
};
