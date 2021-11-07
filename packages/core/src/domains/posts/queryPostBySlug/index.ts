import { client } from '~config';
import { utils } from '~utils';

import { GRAPHQL_VARIABLES } from '../resources';
import { query } from './query';
import { IBlogPostBySlug, IBlogPostBySlugApiResponse } from './types';

export async function queryPostBySlug(
  slug: string,
  preview = false,
): Promise<IBlogPostBySlug> {
  const apiJsonResponse = await client.request<IBlogPostBySlugApiResponse>(
    query,
    {
      where: {
        ...(preview ? GRAPHQL_VARIABLES.preview : {}),
        slug,
      },
    },
  );

  const postHead = utils.head(apiJsonResponse.posts);

  return postHead;
}
