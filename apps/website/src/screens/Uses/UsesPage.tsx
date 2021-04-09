import { MenuBar } from '@components/MenuBar';
import { SEO } from '@components/SEO';
import { ShareContent } from '@components/Share';
import { useLocalization } from '@hooks/useLocalization';
import { ProseContainer } from '@raulfdm/blog-components';
import { UsesApiData } from '@types-api';
import { getPostUrl } from '@utils/url';
import classNames from 'classnames';
import React from 'react';

export type UsesPageProps = {
  seo: UsesApiData['seo'];
  title: string;
};

export const UsesPage: React.FC<UsesPageProps> = ({ children, seo, title }) => {
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
      <main className="grid-container">
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
      </main>
    </>
  );
};
