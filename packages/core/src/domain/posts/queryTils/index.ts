import { AllSupportedLanguages } from '../../../types';
import { fetcher } from '~utils';

import { query } from './query';
import { ITilsApiResponse } from './types';

export async function queryTils(
  locale: AllSupportedLanguages,
): Promise<ITilsApiResponse> {
  return fetcher.graphql(query, { locale });
}
