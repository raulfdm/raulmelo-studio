module.exports = {
  /**
   * Self-hosted Options
   * https://docs.renovatebot.com/self-hosted-configuration
   */
  username: 'renovate-release',
  onboarding: false,
  requireConfig: false,
  platform: 'github',
  repositories: ['raulfdm/raulmelo-studio'],

  /**
   * Renovate options
   */
  baseBranches: ['main'],
  rebaseWhen: 'conflicted',
  recreateClosed: true,
  branchPrefix: 'renovate/',
  gitAuthor: 'Renovate Bot <bot@renovateapp.com>',
  includeForks: true,
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
    /**
     * Grouping packages to reduce the number of PRs
     */
    {
      matchPackagePatterns: ['eslint'],
      groupName: 'eslint',
      excludePackagePatterns: ['eslint-config-next', '@typescript-eslint'],
    },
    {
      matchPackagePatterns: ['babel'],
      groupName: 'babel',
    },
    {
      matchPackagePatterns: ['@emotion', 'emotion'],
      groupName: 'emotion',
    },
    {
      matchPackagePatterns: [
        'eslint-config-next',
        'next',
        '@next/bundle-analyzer',
      ],
      groupName: 'Next.JS',
    },
    {
      matchPackagePatterns: ['@typescript-eslint'],
      groupName: 'TS Lint',
    },
    {
      groupName: 'Tailwind',
      matchPackagePatterns: [
        'tailwindcss',
        '@tailwindcss/forms',
        '@tailwindcss/aspect-ratio',
        '@tailwindcss/typography',
      ],
    },
  ],
};
