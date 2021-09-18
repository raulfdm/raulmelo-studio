module.exports = {
  extends: [
    '../../.eslintrc.js',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  env: {
    browser: true,
    node: true,
  },
};
