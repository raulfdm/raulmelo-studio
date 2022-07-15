import { client } from '~/config';
import type { SupportedLanguages } from '~/global-types';

import { tagsBySlugQuery } from './query';
import { ITagBySlugPostTag } from './types';

export async function queryTagBySlug(
  slug: string,
  language: SupportedLanguages,
): Promise<ITagBySlugPostTag> {
  return client.fetch(tagsBySlugQuery, {
    slug,
    language,
  });
}
