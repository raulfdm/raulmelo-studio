module.exports = {
  /**
   * Self-hosted Options
   * https://docs.renovatebot.com/self-hosted-configuration
   */
  username: 'renovate-release',
  onboarding: true,
  platform: 'github',
  repositories: ['raulfdm/raulmelo-studio'],
  branchConcurrentLimit: 10,

  /**
   * Renovate options
   */
  baseBranches: ['main'],
  recreateClosed: true,
  gitAuthor: 'Renovate Bot <bot@renovateapp.com>',
  includeForks: true,
  pruneStaleBranches: true,
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
      allowedVersions: '<17',
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
      matchPackagePatterns: ['@astrojs/'],
      matchPackageNames: ['astro'],
      groupName: 'Astro',
    },
    {
      matchPackagePatterns: ['@sanity/'],
      matchPackageNames: ['sanity'],
      groupName: 'Sanity',
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
      groupName: 'babel',
    },
    {
      matchPackagePatterns: ['@xstate'],
      matchPackageNames: ['xstate'],
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
      matchPackageNames: [
        'eslint-config-next',
        'next',
        '@next/bundle-analyzer',
      ],
      groupName: 'Next.JS',
    },
    {
      matchPackagePatterns: ['react-instantsearch'],
      groupName: 'InstantSearch',
    },
    {
      matchPackagePatterns: ['@typescript-eslint'],
      groupName: 'TS Lint',
    },
    {
      matchPackagePatterns: ['@remix-run', 'remix'],
      groupName: 'Remix',
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
