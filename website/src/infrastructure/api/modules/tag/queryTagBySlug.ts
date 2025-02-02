import { SupportedLanguage } from '@raulmelo/core/intl';
import type { SanityClient } from '@sanity/client';
import groq from 'groq';
import { z } from 'zod';

type QueryTagBySlugParams = {
  slug: string;
  language: SupportedLanguage;
  client: SanityClient;
};

export async function queryTagBySlug({
  client,
  language,
  slug,
}: QueryTagBySlugParams) {
  const result = await client.fetch(tagsBySlugQuery, {
    slug,
    language,
  });

  return tagBySlugPost.safeParse(result);
}
export type QueryTagBySlugReturnType = Awaited<
  ReturnType<typeof queryTagBySlug>
>;

const tagsBySlugQuery = groq`
*[_type == "tag" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  "posts": *[_type=='post' && references(^._id) && language == $language] | order(publishedAt desc){
    _id,
    _type,
    publishedAt,
    "slug": slug.current,
    title,
    subtitle,
    description,
    language,
    "tags": tags[]->{
      _id,
      "slug": slug.current,
      name
    },
    "featuredImage": featuredImage.asset->{
      url,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height,
    }
  },
  "tils": *[_type=='til' && references(^._id) && language == $language] | order(publishedAt desc){
    _id,
    _type,
    publishedAt,
    "slug": slug.current,
    title,
    language,
    "tags": tags[]->{
      _id,
      "slug": slug.current,
      name
    }
  },
  "codeSnippets": *[_type=="codeSnippet" && references(^._id)] | order(publishedAt desc){
    ...,
    "slug": slug.current,
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

const featuredImageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

const tagCommonSchema = z.object({
  _id: z.string(),
  publishedAt: z.string(),
  slug: z.string(),
  title: z.string(),
  language: SupportedLanguage,
  tags: z.array(tagSchema).nullable(),
});

const tagTilSchema = tagCommonSchema.extend({
  _type: z.literal('til'),
});
export type QueryTagBySlugTil = z.infer<typeof tagTilSchema>;

const tagPostSchema = tagCommonSchema.extend({
  _type: z.literal('post'),
  subtitle: z.string().nullable(),
  description: z.string(),
  featuredImage: featuredImageSchema.nullable(),
});
export type QueryTagBySlugPost = z.infer<typeof tagPostSchema>;

const codeSnippetsSchema = z.object({
  _type: z.literal('codeSnippet'),
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  publishedAt: z.string(),
  description: z.string(),
  tags: z.array(tagSchema).nullable().default([]),
});

const tagBySlugPost = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  posts: z.array(tagPostSchema),
  tils: z.array(tagTilSchema),
  codeSnippets: z.array(codeSnippetsSchema),
});
