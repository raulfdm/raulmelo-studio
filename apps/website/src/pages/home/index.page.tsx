import type { SupportedLanguages } from '@raulmelo/core';
import { domains } from '@raulmelo/core';
import type { PostsAndTils } from '@raulmelo/core/dist/types/domains/posts';
import type { GetStaticProps } from 'next';

import { HomePage } from './HomePage';

const Home = (props: PostsAndTils) => <HomePage {...props} />;

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

export default Home;
