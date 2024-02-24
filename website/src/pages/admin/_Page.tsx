import { defineConfig, Studio } from 'sanity';

import { sanityStudioConfig } from '@/infrastructure/sanity';

const config = defineConfig(sanityStudioConfig);

export function Page() {
  return <Studio config={config} />;
}
