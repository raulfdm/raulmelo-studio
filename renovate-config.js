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
    {
      matchPackageNames: ['eslint'],
    },
    /**
     * Grouping packages to reduce the number of PRs
     */
    {
      matchPackageNames: ['react', 'react-dom'],
      groupName: 'React',
    },
    {
      matchPackageNames: ['@types/react', '@types/react-dom'],
      groupName: 'React Types',
    },
    {
      matchPackagePatterns: ['eslint'],
      groupName: 'eslint',
      excludePackagePatterns: ['eslint-config-next', '@typescript-eslint'],
    },
    {
      matchPackagePatterns: ['babel'],
      excludePackageNames: ['babel-jest'],
      groupName: 'babel',
    },
    {
      matchPackagePatterns: ['jest'],
      groupName: 'Jest',
    },
    {
      matchPackagePatterns: ['@xstate'],
      groupName: 'XState packages',
    },
    {
      matchPackagePatterns: ['svelte'],
      groupName: 'Svelte Packages',
    },
    {
      matchPackagePatterns: ['sanity', 'groq'],
      groupName: 'sanity',
    },
    {
      matchPackagePatterns: ['@storybook'],
      groupName: 'Storybook',
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
