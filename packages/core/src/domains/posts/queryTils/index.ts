import { client } from '~/config';
import { SUPPORTED_LANGUAGES } from '~/config/languages';
import type { AllLanguages } from '~/global-types';

import { tilQuery } from './query';
import { ITilsApiResponse } from './types';

export async function queryTils(
  language: AllLanguages,
): Promise<ITilsApiResponse> {
  const languages = language === 'all' ? SUPPORTED_LANGUAGES.all : [language];
  return client.fetch(tilQuery, { languages });
}

export type { ITilsTil } from './types';
