import type { QueryPostBySlugReturnType } from '@raulmelo/core/dist/types/domains/posts/queryPostBySlug';

export type BlogPostProps = {
  post: QueryPostBySlugReturnType;
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
