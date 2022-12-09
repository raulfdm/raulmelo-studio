/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [`@remix-run/eslint-config`, `@remix-run/eslint-config/node`],
  rules: {
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
  overrides: [
    {
      files: [`*.test.*`],
      rules: {
        '@typescript-eslint/ban-ts-comment': `off`,
        '@typescript-eslint/no-explicit-any': `off`,
        'jsx-a11y/anchor-is-valid': `off`,
        'jsx-a11y/alt-text': `off`,
        'react/no-unescaped-entities': `off`,
      },
    },
  ],
};
