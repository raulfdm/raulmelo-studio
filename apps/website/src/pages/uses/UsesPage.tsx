import { IUsesData } from '@raulmelo/core/dist/types/domains/uses';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';

import { MdxPostTemplate } from '~/components/MdxPost';
import { useLocalization } from '~/hooks/useLocalization';
import siteData from '~/site-data';
import { getPostUrl } from '~/utils/url';

export type UsesPageProps = {
  seo: IUsesData['seo'];
  title: string;
  content: MDXRemoteSerializeResult;
  postContent: string;
};

export const UsesPage: React.FC<UsesPageProps> = ({
  content,
  seo,
  title,
  postContent,
}) => {
  const { locale } = useLocalization();

  return (
    <MdxPostTemplate
      content={content}
      postContent={postContent}
      title={title}
      publishedAt={'2020-10-20'}
      description={seo.description}
      nextSeo={{
        title: seo.title,
        description: seo.description,
        canonical: getPostUrl('uses', locale),
        openGraph: {
          type: 'article',
          title: seo.title,
          description: seo.description,
          site_name: siteData.personalInformation.fullName,
          images: [
            {
              url: siteData.site.seoImage.url,
              width: 1024,
              height: 512,
              alt: siteData.personalInformation.fullName,
            },
          ],
        },
      }}
    />
  );
};
