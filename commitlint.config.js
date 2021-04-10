module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    (commit) => {
      if (commit.match(/publish/) || commit.match(/chore\(deps\)/i)) {
        return true;
      }

      return false;
    },
  ],

  rules: {
    'body-max-line-length': [1, 'always', 100],
  },
};
