import type { SupportedLanguages } from '../../../types';
import { fetcher } from '~utils';

import { query } from './query';
import type { IPostsAndTilsApi } from './types';

export function queryPostsAndTils(
  locale: SupportedLanguages,
  numberOfPosts = 2,
): Promise<IPostsAndTilsApi> {
  return fetcher.graphql(query, {
    locale,
    numberOfPosts,
  });
}

export * from './types';
