module.exports = {
  root: true,
  extends: '../../.eslintrc.js',
  overrides: [
    {
      files: ['*.test.*'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/alt-text': 'off',
        'react/no-unescaped-entities': 'off',
      },
    },
  ],
};
