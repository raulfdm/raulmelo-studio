import groq from 'groq';
import { z } from 'zod';

import type { SupportedLanguages } from '$config/languages';
import { supportedLanguagesSchema } from '$config/languages';
import { client } from '$config/sanity';

export async function getUses(language: SupportedLanguages): Promise<Uses> {
  const result = await client.fetch(getUsesQuery, { language });

  return usesSchema.parse(result);
}

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
  content: z.any(),
});
type Uses = z.infer<typeof usesSchema>;
