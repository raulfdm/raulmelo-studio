import type { SupportedLanguages } from '@raulmelo/core/config';
import type { QueryPostsReturnType } from '@raulmelo/core/domains';
import { queryPosts } from '@raulmelo/core/domains';
import type { GetStaticProps } from 'next';

import { Blog } from './BlogPage';

type BlogPageProps = { posts: QueryPostsReturnType };

const BlogPage = ({ posts }: BlogPageProps) => {
  return <Blog posts={posts} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = await queryPosts(locale as SupportedLanguages);

  return {
    props: {
      posts,
    },
  };
};

export default BlogPage;
