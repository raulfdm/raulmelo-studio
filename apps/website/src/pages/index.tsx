import { HomePage } from '@screens/Home/HomePage';
import { IHomeGraphQLResponse } from '@screens/Home/types';
import { Backend } from '@services/Backend';
import { GetStaticProps } from 'next';
import React from 'react';

const Home = (props: IHomeGraphQLResponse) => <HomePage {...props} />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const NUMBER_OF_POSTS = 2;

  const query = `
  query Home {
    posts(locale: "${locale}", sort: "date:desc", limit: ${NUMBER_OF_POSTS}) {
      id
      slug
      date
      title
      subtitle
      locale
      description
      featured_image {
        width
        height
        url
      }
      post_tags {
        ...tagsFragment
      }
    }
  
    tils(locale: "${locale}", sort: "publishedAt:desc", limit: ${NUMBER_OF_POSTS}) {
      id
      title
      publishedAt
      locale
      slug
      tags {
        ...tagsFragment
      }
    }
  }
  
  fragment tagsFragment on PostTag {
    slug
    id
    name
  }  
  `;

  const { posts, tils } = await Backend.graphql<IHomeGraphQLResponse>(query);

  return {
    props: {
      posts,
      tils,
    },
  };
};

export default Home;
