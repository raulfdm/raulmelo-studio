import { client } from '~config';

import type { SupportedLanguages } from '../../../types';
import { query } from './query';
import type { IPostsAndTilsApi } from './types';

export function queryPostsAndTils(
  locale: SupportedLanguages,
  numberOfPosts = 2,
): Promise<IPostsAndTilsApi> {
  return client.request(query, {
    locale,
    numberOfPosts,
  });
}

export * from './types';
