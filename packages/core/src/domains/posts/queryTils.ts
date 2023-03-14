import type { PortableTextBlock } from '@portabletext/types';
import { type SanityClient } from '@sanity/client';
import groq from 'groq';
import { z } from 'zod';

import {
  SUPPORTED_LANGUAGES_WITH_ALL,
  supportedLanguagesSchema,
  type SupportedLanguagesWithAll,
} from '@/config';

type QueryTilsParams = {
  language: SupportedLanguagesWithAll;
  client: SanityClient;
};

export async function queryTils({ language, client }: QueryTilsParams) {
  const languages =
    language === 'all' ? SUPPORTED_LANGUAGES_WITH_ALL : [language];

  const result = await client.fetch(tilQuery, { languages });

  return tilsSchema.parse(result);
}

export type QueryTilsReturnType = z.infer<typeof tilsSchema>;

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
  content: z.any().transform((value) => value as PortableTextBlock),
  slug: z.string(),
  tags: z.array(tilTagSchema).optional(),
});

const tilsSchema = z.array(tilSchema);
