import { client } from '~config';

import type { SupportedLanguages } from '../../../types';
import { postQuery, tilQuery } from './query';
import type { IPostsAndTilsApi } from './types';

export async function queryPostsAndTils(
  locale: SupportedLanguages,
  numberOfPosts = 2,
): Promise<IPostsAndTilsApi> {
  const params = {
    start: 0,
    end: numberOfPosts - 1,
    language: locale,
  };
  const [posts, tils] = await Promise.all([
    client.fetch(postQuery, params),
    client.fetch(tilQuery, params),
  ]);

  return {
    posts,
    tils,
  };
}

export * from './types';
