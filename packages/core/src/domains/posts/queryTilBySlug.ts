import type { PortableTextBlock } from '@portabletext/types';
import { type SanityClient } from '@sanity/client';
import groq from 'groq';
import { z } from 'zod';

import { supportedLanguagesSchema } from '@/config';

type QueryTilBySlugParams = {
  slug: string;
  client: SanityClient;
  preview?: boolean;
};

export async function queryTilBySlug({
  slug,
  client,
  preview = false,
}: QueryTilBySlugParams) {
  const extendedClient = client.withConfig({ useCdn: !preview });

  const query = getQuery(preview);

  const result = await extendedClient.fetch(query, {
    slug,
    preview,
  });

  const parseResult = tilBySlugSchema.safeParse(result);

  if (!parseResult.success) {
    return null;
  }

  return parseResult.data;
}

export type QueryTilBySlugReturnType = Awaited<
  ReturnType<typeof queryTilBySlug>
>;

function getQuery(preview: boolean) {
  const previewCondition = preview
    ? `(_id in path('drafts.**'))`
    : `!(_id in path('drafts.**'))`;

  return groq`
  *[_type=="til" && slug.current == $slug && ${previewCondition}][0]{
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
}

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
