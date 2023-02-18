module.exports = {
  extends: ['plugin:astro/recommended'],

  // ...
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ['*.astro'],
      plugins: ['simple-import-sort'],
      // Allows Astro components to be parsed.
      parser: 'astro-eslint-parser',
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        '@typescript-eslint/consistent-type-assertions': `error`,
        '@typescript-eslint/consistent-type-imports': [
          `error`,
          { disallowTypeAnnotations: false },
        ],
        quotes: [`error`, `backtick`],
        'no-unused-vars': `off`,
        '@typescript-eslint/no-unused-vars': [
          `warn`,
          { destructuredArrayIgnorePattern: `^_` },
        ],
      },
    },
    // ...
  ],
};
