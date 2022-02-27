import { IBlogPostBySlugApiResponse } from '@raulmelo/core/dist/types/domains/posts/queryPostBySlug/types';

export type BlogPostProps = {
  post: IBlogPostBySlugApiResponse;
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
