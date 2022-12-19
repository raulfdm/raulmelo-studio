import type { SupportedLanguages } from '@raulmelo/core';
import { domains } from '@raulmelo/core';
import type { QueryPostsReturnType } from '@raulmelo/core/dist/types/domains/posts/queryPosts';
import type { GetStaticProps } from 'next';

import { Blog } from './BlogPage';

type BlogPageProps = { posts: QueryPostsReturnType };

const BlogPage = ({ posts }: BlogPageProps) => {
  return <Blog posts={posts} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = await domains.posts.queryPosts(locale as SupportedLanguages);

  return {
    props: {
      posts,
    },
  };
};

export default BlogPage;
