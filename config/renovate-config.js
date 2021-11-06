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
    /**
     * Resolutions
     */
    {
      matchPackageNames: ['ansi-regex', 'glob-parent'],
      enabled: false,
    },
    {
      matchPackageNames: ['@types/node'],
      allowedVersions: '<15',
    },
    /**
     * NextJS 12.0.2 still does not support ESLint 8.
     *
     * apps/website build: error - ESLint version 8.1.0 is not yet supported.
     * Please downgrade to version 7 for the meantime: npm uninstall eslint
     * && npm install --save-dev eslint@"<8.0.0"
     */
    {
      matchPackageNames: ['eslint'],
      allowedVersions: '<8',
    },
  ],
};
