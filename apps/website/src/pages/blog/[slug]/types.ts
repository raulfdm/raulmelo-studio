import type { BlogPostBySlug } from '@raulmelo/core/dist/types/domains/posts/queryPostBySlug';

export type BlogPostProps = {
  post: BlogPostBySlug;
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
