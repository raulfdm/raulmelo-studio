import { ShareContent } from '@components/ShareContent';
import { useLocalization } from '@hooks/useLocalization';
import { ProseContainer } from '@raulfdm/blog-components';
import { getPostUrl } from '@utils/url';
import classNames from 'classnames';
import { NextSeo } from 'next-seo';
import React from 'react';
import siteData from 'site-data';
import { UsesPageApi } from './types';

export type UsesPageProps = {
  seo: UsesPageApi['seo'];
  title: string;
};

export const UsesPage: React.FC<UsesPageProps> = ({ children, seo, title }) => {
  const { locale } = useLocalization();

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={getPostUrl('uses', locale)}
        openGraph={{
          type: 'article',
          title: seo.title,
          description: seo.description,
          site_name: siteData.personalInformation.full_name,
          images: [
            {
              url: siteData.site.seo_image.url,
              width: 1024,
              height: 512,
              alt: siteData.personalInformation.full_name,
            },
          ],
        }}
      />
      <ShareContent
        as="aside"
        className={classNames([
          'row-start-2 col-span-full md:col-span-1 md:row-auto lg:col-span-2',
        ])}
        linkedIn={{ title, summary: seo.description }}
        twitter={{ text: `${title}.\n${seo.description}\b` }}
      />
      <ProseContainer
        as="article"
        className={classNames([
          'w-full',
          'col-span-full md:col-start-2 lg:col-start-3',
        ])}
      >
        <h1
          className={classNames([
            'text-xl sm:text-2xl lg:text-3xl',
            'font-black',
            'tracking-tight',
            'col-span-full',
          ])}
        >
          {title}
        </h1>
        {children}
      </ProseContainer>
    </>
  );
};
