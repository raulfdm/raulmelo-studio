import { client } from '~config';
import { utils } from '~utils';

import { GRAPHQL_VARIABLES } from '../resources';
import { query } from './query';
import { ITilBySlug, ITilBySlugApiResponse } from './types';

export async function queryTilBySlug(
  slug: string,
  preview = false,
): Promise<ITilBySlug> {
  const { tils } = await client.request<ITilBySlugApiResponse>(query, {
    where: {
      slug,
      ...(preview ? GRAPHQL_VARIABLES.preview : {}),
    },
  });

  const til = utils.head(tils);

  return til;
}

export * from './types';
