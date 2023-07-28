import image from '@astrojs/image';
import partytown from '@astrojs/partytown';
import prefetch from '@astrojs/prefetch';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import type { AstroUserConfig } from 'astro';
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';
import { resolve } from 'import-meta-resolve';
import { loadEnv } from 'vite';

import pkgJson from './package.json';

const { VERCEL_ENV, VERCEL_URL } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  ``,
);

const vscodeOnigurumaPath = new URL(
  `onig.wasm`,
  resolve(`vscode-oniguruma`, import.meta.url),
).pathname;

const config = {
  site: `http://localhost:3000`,
  output: `server`,
  integrations: [
    partytown(),
    tailwind() as any,
    react(),
    image({
      serviceEntryPoint: `@astrojs/image/sharp`,
    }),
    robotsTxt({
      policy: [
        {
          userAgent: `*`,
          allow: `/`,
          disallow: [`/search`, `/404`],
        },
      ],
    }),
    prefetch(),
    svelte(),
  ],
  adapter: vercel({
    analytics: true,
    includeFiles: [vscodeOnigurumaPath],
  }) as any,
  build: {
    client: 'server',
  },
  vite: {
    build: {
      rollupOptions: {
        logLevel: 'debug',
        external: getExternals(),
      },
    },
    // ssr: {
    //   external: getExternals(),
    // },
  },
} satisfies AstroUserConfig;

if (VERCEL_ENV === `production`) {
  config.site = `https://www.raulmelo.me`;
} else if (VERCEL_URL) {
  config.site = `https://${VERCEL_URL}`;
}

function getExternals() {
  const notExternals = [
    '@astrojs/image',
    'astro-portabletext',
    'astro-seo',
    'sharp',
  ];

  const dependenciesOfDependencies = [
    '@emotion/unitless',
    '@sanity/block-content-to-hyperscript',
    '@sanity/schema',
    'date-fns',
    'framer-motion',
    'is-decimal',
    'lodash',
    'react-rx',
    'rxjs',
    'uuid',
  ];

  const allDependencies = [
    ...dependenciesOfDependencies,
    ...Object.keys(pkgJson.dependencies),
    ...Object.keys(pkgJson.devDependencies),
  ]
    .sort((a, b) => a.localeCompare(b))
    .filter((dep) => !dep.includes('svelte'))
    .filter((dep) => !notExternals.includes(dep));

  return allDependencies;
}

export default defineConfig(config);
