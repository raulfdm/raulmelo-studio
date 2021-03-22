module.exports = {
  extends: [
    '@commitlint/config-lerna-scopes',
    '@commitlint/config-conventional',
  ],
  ignores: [
    (commit) => {
      if (commit.match(/publish/) || commit.match(/chore\(deps\)/i)) {
        return true;
      }

      return false;
    },
  ],
};
