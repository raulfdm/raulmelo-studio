import { SupportedLanguages } from '../../../types';
import { fetcher, utils } from '~utils';
import { ITagBySlugApiResponse, ITagBySlugPostTag } from './types';

import { query } from './query';

export async function queryTagBySlug(
  slug: string,
  locale: SupportedLanguages,
): Promise<ITagBySlugPostTag> {
  const { postTags } = await fetcher.graphql<ITagBySlugApiResponse>(query, {
    slug,
    locale,
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tag = utils.head(postTags)!;

  return tag;
}
