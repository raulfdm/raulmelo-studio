import { client } from '$config/sanity';

import { allTagsQuery } from './query';
import { Tag, tagsSchema } from './schema';

export async function queryAllTags(): Promise<Tag[]> {
  const result = await client.fetch(allTagsQuery);

  return tagsSchema.parse(result);
}

export { Tag };
