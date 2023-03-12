import { defineConfig,Studio } from 'sanity';

import { sanityBaseConfig } from '@/infrastructure/sanity';

const config = defineConfig(sanityBaseConfig);

export function Page() {
  return <Studio config={config} />;
}
