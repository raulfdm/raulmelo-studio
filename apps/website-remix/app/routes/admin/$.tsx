import { sanityBaseConfig } from '$infrastructure/config/sanity';
import { ClientOnly } from 'remix-utils';
import { Studio, defineConfig } from 'sanity';

const config = defineConfig(sanityBaseConfig);

export default function AdminRoute() {
  return <ClientOnly>{() => <Studio config={config} />}</ClientOnly>;
}
