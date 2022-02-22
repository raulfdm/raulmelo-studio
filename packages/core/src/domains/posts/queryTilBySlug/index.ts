import { client } from '~config';

import { tilBySlugQuery } from './query';
import { ITilBySlugApiResponse } from './types';

export async function queryTilBySlug(
  slug: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  preview = false,
): Promise<ITilBySlugApiResponse> {
  return client.fetch(tilBySlugQuery, {
    slug,
  });
}

export * from './types';
