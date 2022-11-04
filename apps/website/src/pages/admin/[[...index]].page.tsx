import { NextStudio } from 'next-sanity/studio';
import { ReactElement, useEffect } from 'react';
import { defineConfig } from 'sanity';

import { sanityBaseConfig } from '~/config/sanity';

const config = defineConfig(sanityBaseConfig);

export default function AdminPage() {
  return <NextStudio config={config} />;
}

AdminPage.getLayout = function getLayout(page: ReactElement) {
  useEffect(() => {
    document.body.style.paddingBottom = '0';
  }, []);
  return <>{page}</>;
};
