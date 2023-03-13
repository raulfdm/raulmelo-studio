import type { PortableTextBlock } from '@portabletext/types';
import { type SanityClient } from '@sanity/client';
import groq from 'groq';
import { z } from 'zod';

import { type SupportedLanguages, supportedLanguagesSchema } from '@/config';

type GetUsesParams = {
  language: SupportedLanguages;
  client: SanityClient;
};

export async function getUses({ language, client }: GetUsesParams) {
  const result = await client.fetch(getUsesQuery, { language });

  return usesSchema.parse(result);
}

export type GetUsesReturnType = Awaited<ReturnType<typeof getUses>>;

const getUsesQuery = groq`
*[_type=="uses" && language == $language][0]{
  language,
  title,
  _createdAt,
  _updatedAt,
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
  "seo":{
    "description": seoDescription,
    "title": seoTitle
  }
}
`;

const usesSeoSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const usesSchema = z.object({
  language: supportedLanguagesSchema,
  _createdAt: z.string(),
  _updatedAt: z.string(),
  title: z.string(),
  seo: usesSeoSchema,
  content: z.any().transform((value) => value as PortableTextBlock),
});
