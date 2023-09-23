import path from 'node:path';

import { skeleton } from '@skeletonlabs/tw-plugin';
import type { Config } from 'tailwindcss';

const config = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    path.join(
      require.resolve('@skeletonlabs/skeleton'),
      '../**/*.{html,js,svelte,ts}',
    ),
  ],
  theme: {},
  plugins: [
    require('@tailwindcss/forms'),
    skeleton({
      themes: { preset: ['modern'] },
    }),
  ],
} satisfies Config;

export default config;
