import { client } from '~config';

import { postQuery } from './query';
import { IBlogPostBySlugApiResponse } from './types';

export async function queryPostBySlug(
  slug: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  preview = false,
): Promise<IBlogPostBySlugApiResponse> {
  return client.fetch<IBlogPostBySlugApiResponse>(postQuery, {
    slug,
  });
}
