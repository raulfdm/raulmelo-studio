import { AllSupportedLanguages, domains } from '@raulfdm/core';
import { IBlogPagePost } from '@raulfdm/core/dist/types/domains/posts';
import { Blog } from '@screens/Blog';
import chunk from 'lodash.chunk';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const POST_THRESHOLD = 6;

type BlogPageProps = { numberOfPosts: number; posts: IBlogPagePost[] };

const BlogPage = ({ posts, ...props }: BlogPageProps) => {
  const router = useRouter();

  const { page = '1' } = router.query;

  if (!posts) return null;

  /**
   * This only exists to make easier to identify if it's a new set of posts.
   * I initially thought about using posts.length as useMemo dependency, however
   * two arrays with 10 elements don't have necessarily the same elements.
   */
  const postsFootprint = JSON.stringify(posts.map((p) => p.id));

  const postsChunks = React.useMemo(
    () => chunk(posts, POST_THRESHOLD),
    [postsFootprint],
  );

  const pageNumber = parseInt(page as string);
  const pageIndex = pageNumber - 1;

  return (
    <Blog
      {...props}
      posts={postsChunks[pageIndex]}
      pageNumber={pageNumber}
      numberOfPages={postsChunks.length}
    />
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { posts } = await domains.posts.queryPosts(
    locale as AllSupportedLanguages,
  );

  return {
    props: {
      posts,
      numberOfPosts: posts.length,
    },
  };
};

export default BlogPage;
