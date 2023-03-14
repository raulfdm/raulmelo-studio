import { type SanityClient } from '@sanity/client';
import groq from 'groq';
import { z } from 'zod';

type QueryAllTagsParams = {
  client: SanityClient;
};

export async function queryAllTags({ client }: QueryAllTagsParams) {
  const result = await client.fetch(allTagsQuery);

  return tagsSchema.parse(result);
}

export type QueryAllTagsReturnType = Awaited<ReturnType<typeof queryAllTags>>;

const allTagsQuery = groq`
*[_type == "tag" && !(_id in path('drafts.**'))] | order(slug.current asc){
  "slug": slug.current
}
`;

const tagSchema = z.object({
  slug: z.string(),
});

const tagsSchema = z.array(tagSchema);
