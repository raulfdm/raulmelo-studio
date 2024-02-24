import type { PortableTextBlock } from '@portabletext/types';
import type { SanityClient } from '@sanity/client';
import groq from 'groq';
import { z } from 'zod';

import { SupportedLanguages } from '@/infrastructure/config/types/language';

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
  const extendedClient = client.withConfig({
    useCdn: preview === false,
    perspective: preview ? 'previewDrafts' : 'published',
  });

  const [til] = await extendedClient.fetch(query, {
    slug,
    preview,
  });

  const parseResult = tilBySlugSchema.safeParse(til);

  if (!parseResult.success) {
    console.error(parseResult.error.toString());
    return null;
  }

  return parseResult.data;
}

export type QueryTilBySlugReturnType = Awaited<
  ReturnType<typeof queryTilBySlug>
>;

const query = groq`
*[_type=="til" && slug.current == $slug]{
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
  },

  "relatedPosts": relatedPosts[] -> {
    _type,
    _id,
    title,
    "lang": language,
    "slug": slug.current,
    publishedAt,
    "tags": tags[]->{
      _id,
      name,
      "slug": slug.current
    },
  }
}
`;

const tagSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
});

const relatedPostSchema = z.object({
  _id: z.string(),
  _type: z.enum(['post', 'til']),
  lang: SupportedLanguages,
  publishedAt: z.string(),
  slug: z.string(),
  tags: z.array(tagSchema).nullable(),
  title: z.string(),
});

const tilBySlugSchema = z.object({
  _id: z.string(),
  publishedAt: z.string(),
  title: z.string(),
  language: SupportedLanguages,
  slug: z.string(),
  content: z.any().transform((value) => value as PortableTextBlock),
  tags: z.array(tagSchema).nullable(),
  relatedPosts: z
    .array(relatedPostSchema)
    .nullable()
    .transform((value) => value ?? []),
});
