module.exports = {
  overrides: [
    {
      files: ['*.test.*', '*.stories.*'],
      rules: {
        'jsx-a11y/anchor-is-valid': 'off',
      },
    },
  ],

  rules: {
    eqeqeq: 'off',
  },
};
