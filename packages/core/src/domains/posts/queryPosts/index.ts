import { client } from '~/config';
import { SUPPORTED_LANGUAGES } from '~/config/languages';
import type { AllSupportedLanguages } from '~/global-types';

import { postQuery } from './query';
import { IBlogPageApiResponse } from './types';

export function queryPosts(
  language: AllSupportedLanguages,
): Promise<IBlogPageApiResponse> {
  const languages = language === 'all' ? SUPPORTED_LANGUAGES.all : [language];

  return client.fetch(postQuery, { languages });
}

export * from './types';
