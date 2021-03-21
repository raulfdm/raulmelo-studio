module.exports = {
  extends: [
    '@commitlint/config-lerna-scopes',
    '@commitlint/config-conventional',
  ],
  ignores: [
    (commit) => {
      return commit.includes('Publish');
    },
  ],
};
