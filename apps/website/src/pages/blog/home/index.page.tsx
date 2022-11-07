import type { SupportedLanguages } from '@raulmelo/core';
import { domains } from '@raulmelo/core';
import type { IBlogPagePost } from '@raulmelo/core/dist/types/domains/posts';
import type { GetStaticProps } from 'next';

import { Blog } from './BlogPage';

type BlogPageProps = { posts: IBlogPagePost[] };

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
