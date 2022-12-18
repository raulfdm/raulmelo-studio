import type { SupportedLanguagesWithAll } from '$config/languages';
import { SUPPORTED_LANGUAGES } from '$config/languages';
import { client } from '$config/sanity';

import { postQuery } from './query';
import type { IBlogPageApiResponse } from './types';

export function queryPosts(
  language: SupportedLanguagesWithAll,
): Promise<IBlogPageApiResponse> {
  const languages = language === 'all' ? SUPPORTED_LANGUAGES : [language];

  return client.fetch(postQuery, { languages });
}

export * from './types';
