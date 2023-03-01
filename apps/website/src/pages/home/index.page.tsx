import type { SupportedLanguages } from '@raulmelo/core/config';
import type { QueryPostsAndTilsReturnType } from '@raulmelo/core/domains';
import { queryPostsAndTils } from '@raulmelo/core/domains';
import type { GetStaticProps } from 'next';

import { HomePage } from './HomePage';

export default function Home(props: QueryPostsAndTilsReturnType) {
  return <HomePage {...props} />;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const NUMBER_OF_POSTS = 2;
  const { posts, tils } = await queryPostsAndTils(
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
