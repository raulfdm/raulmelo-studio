import { client } from '~/config';
import { SUPPORTED_LANGUAGES } from '~/config/languages';
import type { AllLanguages } from '~/global-types';

import { postQuery } from './query';
import { IBlogPageApiResponse } from './types';

export function queryPosts(
  language: AllLanguages,
): Promise<IBlogPageApiResponse> {
  const languages = language === 'all' ? SUPPORTED_LANGUAGES.all : [language];

  return client.fetch(postQuery, { languages });
}

export * from './types';
