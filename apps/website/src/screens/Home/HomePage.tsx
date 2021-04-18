import { useLocalization } from '@hooks/useLocalization';
import { Pagination, PaginationItem } from '@raulfdm/blog-components';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { defineMessages } from 'react-intl';
import siteData from 'site-data';
import { AuthorPresentation } from './components/AuthorPresentation';
import { Posts } from './components/Posts';
import { usePageQueryReset } from './hooks/usePageQueryReset';
import { HomePageProps } from './types';

const messages = defineMessages({
  latests: {
    id: 'home.title.latests',
  },
  page: {
    id: 'home.title.page',
  },
});

export const HomePage: React.FC<HomePageProps> = ({
  posts,
  pageNumber,
  numberOfPages,
}) => {
  const { formatMessage } = useLocalization();
  const router = useRouter();
  usePageQueryReset({ pageNumber, numberOfPages });

  const pageTitle = pageNumber === 1 ? messages.latests : messages.page;

  return (
    <>
      {/* This enforces the canonical being "/" instead "/blog" (redirect) */}
      <NextSeo canonical={siteData.site.url} />

      <AuthorPresentation />
      <Posts posts={posts} title={formatMessage(pageTitle, { pageNumber })} />
      {numberOfPages > 1 ? (
        <Pagination
          className="flex justify-center mt-6 col-span-full"
          count={numberOfPages}
          page={pageNumber}
          defaultPage={pageNumber}
          onChange={(_, page) => {
            router.push(`${router.pathname}?page=${page}`);
          }}
          renderItem={(item) => {
            return <PaginationItem {...item} />;
          }}
        />
      ) : null}
    </>
  );
};
