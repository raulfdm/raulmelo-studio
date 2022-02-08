<<<<<<< Updated upstream
import { IBlogPostBySlug } from '@raulmelo/core/dist/types/domains/posts/queryPostBySlug/types';
=======
import { IBlogPostBySlugApiResponse } from '@raulmelo/core/dist/types/domains/posts/queryPostBySlug/types';
>>>>>>> Stashed changes
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type BlogPostProps = {
  post: IBlogPostBySlugApiResponse;
  preview: boolean;
  content: MDXRemoteSerializeResult;
};

export type BlogPostPageProps = BlogPostProps & {
  content: MDXRemoteSerializeResult;
  preview: boolean;
};

export type GetStaticProps = {
  params: {
    slug: string;
  };
  preview?: boolean;
};
