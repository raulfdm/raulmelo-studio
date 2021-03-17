import React from 'react';
import { ProseContainer } from '@raulfdm/blog-components';

import { MenuBar } from '@components/MenuBar';
import { useLocalization } from '@hooks/useLocalization';
import { getPostUrl } from '@utils/url';
import { SEO } from '@components/SEO';
import { UsesApiData } from '@types-api';

export type UsesPageProps = {
  seo: UsesApiData['seo'];
};

export const UsesPage: React.FC<UsesPageProps> = ({ children, seo }) => {
  const { locale } = useLocalization();

  return (
    <>
      <SEO
        withDefaultTitle
        title={seo.title}
        description={seo.description}
        url={getPostUrl('uses', locale)}
      />
      <MenuBar />
      <ProseContainer>{children}</ProseContainer>
    </>
  );
};
