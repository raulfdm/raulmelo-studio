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

  const result = await extendedClient.fetch(query, {
    slug,
    preview,
  });

  const { draft, published } = getPublishedAndDraft(result);

  const parseResult =
    preview && draft
      ? tilBySlugSchema.safeParse(draft)
      : tilBySlugSchema.safeParse(published);

  if (!parseResult.success) {
    console.error(parseResult.error.toString());
    return null;
  }

  return parseResult.data;
}

function getPublishedAndDraft(posts: TilPost[]) {
  const result: {
    published: null | TilPost;
    draft: null | TilPost;
  } = {
    published: null,
    draft: null,
  };

  for (const post of posts) {
    if (post._id.startsWith('drafts.')) {
      result.draft = post;
    } else {
      result.published = post;
    }
  }

  return result;
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

type TilPost = z.infer<typeof tilBySlugSchema>;
