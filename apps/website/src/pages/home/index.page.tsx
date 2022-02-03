import { domains, SupportedLanguages } from '@raulmelo/core';
import { IPostsAndTilsApi } from '@raulmelo/core/dist/types/domains/posts';
import { GetStaticProps } from 'next';

import { HomePage } from './HomePage';

const Home = (props: IPostsAndTilsApi) => <HomePage {...props} />;

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
