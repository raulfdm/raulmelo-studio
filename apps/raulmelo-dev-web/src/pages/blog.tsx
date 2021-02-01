import React from 'react';
import { GetStaticProps } from 'next';

import { Backend } from '@services/Backend';
import { PersonalInformationApiData, SocialApiData } from '@types-api';
import { PostsApiData } from 'src/types/api/posts';
import { HomePage, HomePageProps } from '@screens/Home/HomePage';
import { sanitizePosts } from '@screens/Home/utils/apiSanitizer';
import { useRouter } from 'next/router';
import chunk from 'lodash.chunk';

const POST_THRESHOLD = 4;

const Home = ({ posts, ...props }: HomePageProps) => {
  const router = useRouter();

  const { page = '1' } = router.query;

  if (!posts) return null;

  /**
   * This only exists to make easier to identify if it's a new set of posts.
   * I initially thought about using posts.length as useMemo dependency, however
   * two arrays with 10 elements don't have necessarily the same elements.
   */
  const postsFootprint = JSON.stringify(posts.map((p) => p.id));

  const postsChunks = React.useMemo(() => chunk(posts, POST_THRESHOLD), [
    postsFootprint,
  ]);

  const pageNumber = parseInt(page as string);
  const pageIndex = pageNumber - 1;

  return (
    <HomePage
      {...props}
      posts={postsChunks[pageIndex]}
      pageNumber={pageNumber}
      numberOfPages={postsChunks.length}
    />
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, ...props }) => {
  console.log(props);
  const [posts, personalInfo, social] = (await Promise.all([
    Backend.fetch('posts', {
      params: {
        _sort: 'date:DESC',
        language: locale as string,
      },
    }),
    Backend.fetch('personal-information'),
    Backend.fetch('social'),
  ])) as [PostsApiData, PersonalInformationApiData, SocialApiData];

  return {
    props: {
      posts: sanitizePosts(posts),
      personalInfo,
      social,
      numberOfPosts: posts.length,
    },
  };
};

export default Home;
