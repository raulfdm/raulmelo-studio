import { client } from '~/config';

import { postQuery } from './query';
import type { BlogPostBySlug } from './types';
import { blogPostBySlugSchema } from './types';

export async function queryPostBySlug(slug: string): Promise<BlogPostBySlug> {
  const result = await client.fetch<BlogPostBySlug>(postQuery, {
    slug,
  });

  return blogPostBySlugSchema.parse(result);
}

export type { BlogPostBySlug } from './types';
