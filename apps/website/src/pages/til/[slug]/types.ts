<<<<<<< Updated upstream
import { ITilBySlug } from '@raulmelo/core/dist/types/domains/posts';
=======
import { IPostsAndTilsTil } from '@raulmelo/core/dist/types/domains/posts';
>>>>>>> Stashed changes
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type ITilPostParsed = IPostsAndTilsTil & {
  content: MDXRemoteSerializeResult;
};
