import { IPostsAndTilsTil } from '@raulmelo/core/dist/types/domains/posts';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type ITilPostParsed = IPostsAndTilsTil & {
  content: MDXRemoteSerializeResult;
};
