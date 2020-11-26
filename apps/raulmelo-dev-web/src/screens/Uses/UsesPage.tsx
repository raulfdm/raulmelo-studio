import React from 'react';

import { MenuBar } from '@components/MenuBar';
import { useLocalization } from '@hooks/useLocalization';
import { getPostUrl } from '@utils/url';
import { SEO } from '@components/SEO';
import { UsesApiData } from '@types-api';
import { BlogUiContainer } from '@screens/Blog/components/BlogUiContainer';

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
      <BlogUiContainer>{children}</BlogUiContainer>
    </>
  );
};
