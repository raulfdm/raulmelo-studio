import { ITilBySlug } from '@raulfdm/core/dist/types/domains/posts';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type ITilPostParsed = ITilBySlug & {
  content: MDXRemoteSerializeResult;
};
