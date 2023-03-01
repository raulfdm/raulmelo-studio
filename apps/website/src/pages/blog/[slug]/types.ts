import type { QueryPostBySlugReturnType } from '@raulmelo/core/domains';

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
