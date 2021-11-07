import { client } from '~config';
import { utils } from '~utils';

import { GRAPHQL_VARIABLES } from '../../posts/resources';
import { query } from './query';
import { IPreviewPostOrTil, IQueryPostOrTilApiResponse } from './types';

export async function queryPostOrTil(
  slug: string,
): Promise<IPreviewPostOrTil | null> {
  const { tils, posts } = await client.request<IQueryPostOrTilApiResponse>(
    query,
    {
      where: {
        ...GRAPHQL_VARIABLES.preview,
        slug,
      },
    },
  );

  const til = utils.head(tils);
  if (til) {
    return {
      type: 'til',
      ...til,
    };
  }

  const post = utils.head(posts);
  if (post) {
    return {
      type: 'post',
      ...post,
    };
  }

  return null;
}
