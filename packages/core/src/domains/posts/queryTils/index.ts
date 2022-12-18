import type { SupportedLanguagesWithAll } from '$config/languages';
import { SUPPORTED_LANGUAGES_WITH_ALL } from '$config/languages';
import { client } from '$config/sanity';

import { tilQuery } from './query';
import type { ITilsApiResponse } from './types';

export async function queryTils(
  language: SupportedLanguagesWithAll,
): Promise<ITilsApiResponse> {
  const languages =
    language === 'all' ? SUPPORTED_LANGUAGES_WITH_ALL : [language];
  return client.fetch(tilQuery, { languages });
}

export type { ITilsTil } from './types';
