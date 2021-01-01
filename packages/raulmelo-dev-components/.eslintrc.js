module.exports = {
  overrides: [
    {
      files: ['*.test.*', '*.stories.*'],
      rules: {
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/alt-text': 'off',
      },
    },
  ],

  rules: {
    eqeqeq: 'off',
  },
};
