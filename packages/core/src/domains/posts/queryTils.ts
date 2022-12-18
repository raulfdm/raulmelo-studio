import groq from 'groq';
import { z } from 'zod';

import type { SupportedLanguagesWithAll } from '$config/languages';
import { supportedLanguagesSchema } from '$config/languages';
import { SUPPORTED_LANGUAGES_WITH_ALL } from '$config/languages';
import { client } from '$config/sanity';

export async function queryTils(
  language: SupportedLanguagesWithAll,
): Promise<Tils> {
  const languages =
    language === 'all' ? SUPPORTED_LANGUAGES_WITH_ALL : [language];

  const result = await client.fetch(tilQuery, { languages });

  return tilsSchema.parse(result);
}

const tilQuery = groq`
*[_type == "til" && language in $languages && !(_id in path('drafts.**'))] | order(publishedAt desc){
  _id,
  publishedAt,
  title,
  language,
  content[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
      ...,
      "itemMeta": @.item -> {
        "slug": slug.current,
        _type
      }
    },
    }
  },
  "slug": slug.current,
  "tags": tags[]->{
    _id,
    name,
    "slug": slug.current
  }
}
`;

const tilTagSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
});

const tilSchema = z.object({
  _id: z.string(),
  publishedAt: z.string(),
  title: z.string(),
  language: supportedLanguagesSchema,
  content: z.any(),
  slug: z.string(),
  tags: z.array(tilTagSchema),
});

const tilsSchema = z.array(tilSchema);
type Tils = z.infer<typeof tilsSchema>;
