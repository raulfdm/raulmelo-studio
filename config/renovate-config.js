module.exports = {
  baseBranches: ['main'],
  labels: ['dependencies'],
  branchPrefix: 'deps/',
  commitMessagePrefix: 'chore:',
  commitMessageTopic: '{{depName}}',
  username: 'renovate-release',
  gitAuthor: 'Renovate Bot <bot@renovateapp.com>',
  platform: 'github',
  repositories: [
    'renovatebot/github-action',
    'renovate-tests/cocoapods1',
    'renovate-tests/gomod1',
  ],
  packageRules: [
    {
      description: 'lockFileMaintenance',
      matchUpdateTypes: [
        'pin',
        'digest',
        'patch',
        'minor',
        'major',
        'lockFileMaintenance',
      ],
      dependencyDashboardApproval: false,
      stabilityDays: 0,
    },
  ],
};
