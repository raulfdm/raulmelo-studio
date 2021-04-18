import { HomePage } from '@screens/Home/HomePage';
import { BlogPageGraphQLResponse, HomePageProps } from '@screens/Home/types';
import { Backend } from '@services/Backend';
import chunk from 'lodash.chunk';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const POST_THRESHOLD = 6;

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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { posts } = await Backend.graphql<BlogPageGraphQLResponse>(`
    query Home {
      posts(where: { language: "${locale}" }, sort: "date:desc") {
        id
        language
        slug
        date
        title
        subtitle
        description
        featured_image {
          width
          height
          url
        }
        post_serie {
          slug
          name
          id
        }
        post_tags {
          slug
          id
          name
        }
      }
    }  
  `);

  return {
    props: {
      posts,
      numberOfPosts: posts.length,
    },
  };
};

export default Home;
