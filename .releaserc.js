module.exports = {
  extends: 'semantic-release-monorepo',
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { type: 'chore', release: 'patch' },
          { type: 'refactor', release: 'major' },
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/git',
    [
      '@semantic-release/github',
      {
        assets: ['.'],
      },
    ],
  ],
};
