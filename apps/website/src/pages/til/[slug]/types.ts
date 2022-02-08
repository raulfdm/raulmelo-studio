import { ITilBySlug } from '@raulmelo/core/dist/types/domains/posts';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type ITilPostParsed = ITilBySlug & {
  content: MDXRemoteSerializeResult;
};
