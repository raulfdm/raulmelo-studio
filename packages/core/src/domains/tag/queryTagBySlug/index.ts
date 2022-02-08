import { client } from '~config';

import { SupportedLanguages } from '../../../types';
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
