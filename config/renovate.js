module.exports = {
  /**
   * Self-hosted Options
   * https://docs.renovatebot.com/self-hosted-configuration
   */
  username: 'renovate-release',
  onboarding: false,
  platform: 'github',
  repositories: ['raulfdm/raulmelo-studio'],

  /**
   * Renovate options
   */
  branchPrefix: 'renovate/',
  gitAuthor: 'Renovate Bot <bot@renovateapp.com>',
  includeForks: true,
  prCreation: 'not-pending',
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
      stabilityDays: 3,
    },
    {
      matchPackageNames: ['node'],
      matchManagers: ['dockerfile'],
      enabled: false,
    },
  ],
};
