import type { PortableTextBlock } from '@portabletext/types';
import groq from 'groq';
import { z } from 'zod';

import { supportedLanguagesSchema } from '$config/languages';
import { client } from '$config/sanity';

export async function queryTilBySlug(slug: string) {
  const result = await client.fetch(tilBySlugQuery, {
    slug,
  });

  return tilBySlugSchema.parse(result);
}

export type QueryTilBySlugReturnType = Awaited<
  ReturnType<typeof queryTilBySlug>
>;

const tilBySlugQuery = groq`
*[_type=="til" && slug.current == $slug && !(_id in path('drafts.**'))][0]{
  _id,
  publishedAt,
  title,
  language,
  content[]{
    ...,
    "image": image.asset ->{
      url,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height,
    },
    markDefs[]{
      ...,
      _type == "internalLink" => {
      ...,
      "itemMeta": @.item -> {
        "slug": slug.current,
        _type
      },
    },
    _type == "detailedImage" => {
        ...,
        "image": @.image -> {
          ...
        }
      }
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

const tagSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
});

const tilBySlugSchema = z.object({
  _id: z.string(),
  publishedAt: z.string(),
  title: z.string(),
  language: supportedLanguagesSchema,
  slug: z.string(),
  content: z.any().transform((value) => value as PortableTextBlock),
  tags: z.array(tagSchema).optional(),
});
