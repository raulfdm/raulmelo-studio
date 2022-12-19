import type { SupportedLanguages } from '@raulmelo/core';
import { domains } from '@raulmelo/core';
import type { QueryPostsAndTilsReturnType } from '@raulmelo/core/dist/types/domains/posts/queryPostsAndTils';
import type { GetStaticProps } from 'next';

import { HomePage } from './HomePage';

export default function Home(props: QueryPostsAndTilsReturnType) {
  return <HomePage {...props} />;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const NUMBER_OF_POSTS = 2;
  const { posts, tils } = await domains.posts.queryPostsAndTils(
    locale as SupportedLanguages,
    NUMBER_OF_POSTS,
  );

  return {
    props: {
      posts,
      tils,
    },
  };
};
