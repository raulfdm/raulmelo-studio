import { client } from '~config';
import { AllSupportedLanguages } from '../../../types';

import { query } from './query';
import { IBlogPageApiResponse } from './types';

export function queryPosts(
  locale: AllSupportedLanguages,
): Promise<IBlogPageApiResponse> {
  return client.request<IBlogPageApiResponse>(query, { locale });
}

export * from './types';
