import type { BlogPostBySlug } from '@raulmelo/core/dist/types/domains/posts/queryPostBySlug/types';

export type BlogPostProps = {
  post: BlogPostBySlug;
  preview: boolean;
  estimatedReadingTime: number;
};

export type BlogPostPageProps = BlogPostProps & {
  preview: boolean;
};

export type GetStaticProps = {
  params: {
    slug: string;
  };
  preview?: boolean;
};
