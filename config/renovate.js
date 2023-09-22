module.exports = {
  /**
   * Self-hosted Options
   * https://docs.renovatebot.com/self-hosted-configuration
   */
  /**
   * Prevent the need to have a renovate.json
   */
  onboarding: false,
  requireConfig: 'optional',
  username: 'renovate-release',
  platform: 'github',
  repositories: ['raulfdm/raulmelo-studio'],
  // branchConcurrentLimit: 10,

  /**
   * Renovate options
   */
  baseBranches: ['main'],
  // recreateClosed: true,
  gitAuthor: 'Renovate Bot <bot@renovateapp.com>',
  pruneStaleBranches: true,
  packageRules: [
    /**
     * Resolutions
     */
    {
      matchPackageNames: ['ansi-regex', 'glob-parent'],
      enabled: false,
    },
    {
      matchPackageNames: ['@types/node', 'node'],
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
      matchPackagePrefixes: ['@astrojs'],
      matchPackageNames: [
        'astro',
        'prettier-plugin-astro',
        'eslint-plugin-astro',
      ],
      groupName: 'Astro',
    },
    {
      matchPackagePrefixes: ['@sanity'],
      matchPackageNames: ['sanity'],
      groupName: 'Sanity',
    },
    {
      matchPackagePrefixes: ['eslint'],
      groupName: 'eslint',
    },
    {
      matchPackagePrefixes: ['@babel'],
      groupName: 'babel',
    },
    {
      matchPackagePrefixes: ['@fontsource'],
      groupName: 'Fountsource (website)',
    },
    {
      matchPackagePrefixes: ['@xstate'],
      matchPackageNames: ['xstate'],
      groupName: 'XState',
    },
    {
      matchPackagePrefixes: ['@svelte'],
      matchPackageNames: ['svelte'],
      groupName: 'Svelte',
    },
    {
      matchPackagePrefixes: ['@tabler/icons'],
      groupName: 'Tabler Icons',
    },
    {
      matchPackagePrefixes: ['@sanity', 'sanity-'],
      matchPackageNames: ['sanity', 'groq'],
      groupName: 'Sanity',
    },
    {
      matchPackageNames: ['vite', 'vitest'],
      matchPackagePrefixes: ['vite-plugin'],
      groupName: 'Vite',
    },
    {
      matchPackagePrefixes: ['react-instantsearch'],
      matchPackageNames: ['algoliasearch'],
      groupName: 'Algolia',
    },
    {
      matchPackagePrefixes: ['@typescript-eslint'],
      groupName: 'ESLint TS',
    },
    {
      groupName: 'Tailwind ecosystem',
      matchPackagePrefixes: ['@tailwindcss'],
      matchPackageNames: ['postcss', 'autoprefixer', 'tailwindcss'],
    },
    {
      matchPackageNames: ['daisyui'],
      allowedVersions: '<3',
    },
  ],
};
