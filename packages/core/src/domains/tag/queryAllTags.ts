import groq from 'groq';
import { z } from 'zod';

import { client } from '$config/sanity';

export async function queryAllTags(): Promise<Tag[]> {
  const result = await client.fetch(allTagsQuery);

  return tagsSchema.parse(result);
}

const allTagsQuery = groq`
*[_type == "tag" && !(_id in path('drafts.**'))] | order(slug.current asc){
  "slug": slug.current
}
`;

const tagSchema = z.object({
  slug: z.string(),
});
type Tag = z.infer<typeof tagSchema>;

const tagsSchema = z.array(tagSchema);
