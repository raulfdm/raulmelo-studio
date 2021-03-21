module.exports = {
  extends: [
    '@commitlint/config-lerna-scopes',
    '@commitlint/config-conventional',
  ],
  ignores: [(commit) => commit.match(/publish/)],
};
