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
    /**
     * TODO: remove when the problem is fixed
     * @see https://github.com/withastro/astro/issues/7517
     */
    {
      matchPackageNames: ['@astrojs/image'],
      allowedVersions: ['<0.17'],
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
  ],
};
