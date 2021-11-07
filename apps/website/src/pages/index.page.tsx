import { domains, SupportedLanguages } from '@raulfdm/core';
import { IPostsAndTilsApi } from '@raulfdm/core/dist/types/domains/posts';
import { HomePage } from '@screens/Home/HomePage';
import { GetStaticProps } from 'next';

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
