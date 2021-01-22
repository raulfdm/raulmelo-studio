import React from 'react';
import { GetStaticProps } from 'next';

import { Backend } from '@services/Backend';
import { PersonalInformationApiData, SocialApiData } from '@types-api';
import { PostsApiData } from 'src/types/api/posts';
import { HomePage, HomePageProps } from '@screens/Home/HomePage';
import { sanitizePosts } from '@screens/Home/utils/apiSanitizer';

const Home = (props: HomePageProps) => {
  return <HomePage {...props} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
    },
    revalidate: 1,
  };
};

export default Home;
