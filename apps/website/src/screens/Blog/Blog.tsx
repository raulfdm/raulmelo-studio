import { Pagination, PaginationItem } from '@components/Pagination';
import { useLocalization } from '@hooks/useLocalization';
import { Posts } from '@screens/Home/components/Posts';
import { usePageQueryReset } from '@screens/Home/hooks/usePageQueryReset';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import 'twin.macro';
import { BlogGraphQLResponse } from './types';

const messages = defineMessages({
  latests: {
    id: 'blog.title.latests',
  },
  page: {
    id: 'blog.title.page',
  },
});

type BlogProps = BlogGraphQLResponse & {
  pageNumber: number;
  numberOfPages: number;
};

export const Blog: React.FC<BlogProps> = ({
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
      <NextSeo
        title="Blog"
        description={formatMessage({ id: 'blog.description' })}
      />

      <header tw="col-span-full lg:col-span-10">
        <h1 tw="text-3xl md:text-4xl font-extrabold">Blog</h1>

        <p tw="col-span-full lg:col-span-10 text-md md:text-lg my-4">
          <FormattedMessage id="blog.description" />
        </p>
      </header>

      <Posts posts={posts} title={formatMessage(pageTitle, { pageNumber })} />
      {numberOfPages > 1 ? (
        <Pagination
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
