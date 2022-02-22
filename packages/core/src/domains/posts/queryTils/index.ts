import { SUPPORTED_LANGUAGES } from 'src/config/languages';

import { client } from '~config';

import { AllSupportedLanguages } from '../../../types';
import { tilQuery } from './query';
import { ITilsApiResponse } from './types';

export async function queryTils(
  language: AllSupportedLanguages,
): Promise<ITilsApiResponse> {
  const languages = language === 'all' ? SUPPORTED_LANGUAGES.all : [language];
  return client.fetch(tilQuery, { languages });
}

export type { ITilsTil } from './types';
