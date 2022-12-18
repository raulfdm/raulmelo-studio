import { client } from '$config/sanity';

import { allTagsQuery } from './query';
import type { Tag } from './schema';
import { tagsSchema } from './schema';

export async function queryAllTags(): Promise<Tag[]> {
  const result = await client.fetch(allTagsQuery);

  return tagsSchema.parse(result);
}

export type { Tag } from './schema';
