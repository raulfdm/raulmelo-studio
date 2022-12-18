import type { SupportedLanguages } from '$config/languages';
import { client } from '$config/sanity';

import { tagsBySlugQuery } from './query';
import type { ITagBySlugPostTag } from './types';

export async function queryTagBySlug(
  slug: string,
  language: SupportedLanguages,
): Promise<ITagBySlugPostTag> {
  return client.fetch(tagsBySlugQuery, {
    slug,
    language,
  });
}
