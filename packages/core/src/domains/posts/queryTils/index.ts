import { client } from '~config';
import { AllSupportedLanguages } from '../../../types';

import { query } from './query';
import { ITilsApiResponse } from './types';

export async function queryTils(
  locale: AllSupportedLanguages,
): Promise<ITilsApiResponse> {
  return client.request(query, { locale });
}
