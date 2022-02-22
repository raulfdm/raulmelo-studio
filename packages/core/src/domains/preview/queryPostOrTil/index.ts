import { client } from '~config';

import { postQuery, tilQuery } from './query';
import { IQueryPostOrTil } from './types';

export async function queryPostOrTil(
  slug: string,
): Promise<IQueryPostOrTil | null> {
  const til = await client.fetch(tilQuery, { slug });
  if (til) {
    return til;
  }

  const post = await client.fetch(postQuery, { slug });

  if (post) {
    return post;
  }

  return null;
}
