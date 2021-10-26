module.exports = {
  baseBranches: ['main'],
  labels: ['dependencies'],
  branchPrefix: 'deps/',
  commitMessagePrefix: 'chore:',
  commitMessageTopic: '{{depName}}',
  username: 'renovate-release',
  gitAuthor: 'Renovate Bot <bot@renovateapp.com>',
  platform: 'github',
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
