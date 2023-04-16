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
      allowedVersions: '<19',
    },
    /**
     * Grouping packages to reduce the number of PRs
     */
    {
      matchPackageNames: [
        'react',
        'react-dom',
        '@types/react',
        '@types/react-dom',
      ],
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
      matchPackagePatterns: ['eslint'],
      groupName: 'eslint',
      excludePackagePatterns: ['@typescript-eslint'],
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
      excludeDepNames: ['@tabler/icons-svelte'],
      groupName: 'Svelte',
    },
    {
      matchPackagePatterns: ['@tabler/icons'],
      groupName: 'Tabler Icons',
    },
    {
      matchPackagePatterns: ['sanity', 'groq'],
      groupName: 'sanity',
    },
    {
      matchPackageNames: ['vite', 'vitest'],
      matchPackagePatterns: ['vite-plugin-*'],
      groupName: 'Vite',
    },
    {
      matchPackagePatterns: ['react-instantsearch', 'algoliasearch'],
      groupName: 'Algolia',
    },
    {
      matchPackagePatterns: ['@typescript-eslint'],
      groupName: 'ESLint TS',
    },
    {
      groupName: 'Tailwind ecosystem',
      matchPackagePatterns: ['tailwindcss', '@tailwindcss/*'],
      matchPackageNames: ['postcss', 'autoprefixer'],
    },
  ],
};
