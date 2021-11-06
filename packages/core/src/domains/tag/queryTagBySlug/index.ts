import { SupportedLanguages } from '../../../types';
import { utils } from '~utils';
import { ITagBySlugApiResponse, ITagBySlugPostTag } from './types';

import { query } from './query';
import { client } from '~config';

export async function queryTagBySlug(
  slug: string,
  locale: SupportedLanguages,
): Promise<ITagBySlugPostTag> {
  const { postTags } = await client.request<ITagBySlugApiResponse>(query, {
    slug,
    locale,
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tag = utils.head(postTags)!;

  return tag;
}
