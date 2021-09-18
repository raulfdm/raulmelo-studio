import { IBlogPostBySlug } from '@raulfdm/core/dist/types/domains/posts/queryPostBySlug/types';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type BlogPostProps = {
  post: IBlogPostBySlug;
  preview: boolean;
  content: MDXRemoteSerializeResult;
};

export type BlogPostPageProps = BlogPostProps & {
  content: MDXRemoteSerializeResult;
  preview: boolean;
};
