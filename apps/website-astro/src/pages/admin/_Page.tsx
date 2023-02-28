import { sanityBaseConfig } from '@/infrastructure/sanity';
import { Studio, defineConfig } from 'sanity';

const config = defineConfig(sanityBaseConfig);

export function Page() {
  return <Studio config={config} />;
}
