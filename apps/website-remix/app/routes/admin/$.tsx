import { sanityBaseConfig } from '$infrastructure/config/sanity';
import { useEffect } from 'react';
import { ClientOnly } from 'remix-utils';
import { Studio, defineConfig } from 'sanity';

const config = defineConfig(sanityBaseConfig);

export default function AdminRoute() {
  return <ClientOnly>{() => <StudioConfig />}</ClientOnly>;
}

function StudioConfig() {
  useEffect(() => {
    /**
     * My App's <body> contains a bunch of classes that conflicts with Sanity's
     * Studio. Here I just remove all of them.
     */
    document.body.className = ``;
    /**
     * This enhances the Studio's UI to fill the entire viewport.
     */
    document.body.style.height = `100%`;
  }, []);

  return <Studio config={config} />;
}
