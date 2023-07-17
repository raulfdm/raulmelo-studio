import type { SanityClient } from '@sanity/client';
import groq from 'groq';
import { z } from 'zod';

import type { SupportedLanguages } from '@/config';

type QueryAllTagsParams = {
  client: SanityClient;
  language?: SupportedLanguages;
};

export async function queryAllTags({ client, language }: QueryAllTagsParams) {
  const langQuery = language ? `&& language == "${language}"` : ``;

  const allTagsQuery = groq`
    *[
      _type == "tag"
      && !(_id in path('drafts.**'))
      && count(*[_type == "post" && references(^._id) ${langQuery}]) > 0
    ] | order(slug.current asc) {
      "slug": slug.current,
      name
    }
`;

  const result = await client.fetch(allTagsQuery);

  return tagsSchema.parse(result);
}

export type QueryAllTagsReturnType = Awaited<ReturnType<typeof queryAllTags>>;

const tagSchema = z.object({
  slug: z.string(),
  name: z.string(),
});

const tagsSchema = z.array(tagSchema);
