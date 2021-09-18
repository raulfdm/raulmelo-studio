import { AllSupportedLanguages } from '../../../types';
import { fetcher } from '~utils';

import { query } from './query';
import { IBlogPageApiResponse } from './types';

export function queryPosts(
  locale: AllSupportedLanguages,
): Promise<IBlogPageApiResponse> {
  return fetcher.graphql<IBlogPageApiResponse>(query, { locale });
}

export * from './types';
