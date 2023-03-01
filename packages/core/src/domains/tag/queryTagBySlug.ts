import groq from 'groq';
import { z } from 'zod';

import {
  client,
  type SupportedLanguages,
  supportedLanguagesSchema,
} from '@/config';

export async function queryTagBySlug(
  slug: string,
  language: SupportedLanguages,
) {
  const result = await client.fetch(tagsBySlugQuery, {
    slug,
    language,
  });

  return tagBySlugPost.parse(result);
}
export type QueryTagBySlugReturnType = Awaited<
  ReturnType<typeof queryTagBySlug>
>;

const tagsBySlugQuery = groq`
*[_type == "tag" && slug.current == $slug && !(_id in path('drafts.**'))][0]{
  _id,
  name,
  "slug": slug.current,
  "posts": *[_type=='post' && references(^._id) && language == $language && !(_id in path('drafts.**'))] | order(publishedAt desc){
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
  "tils": *[_type=='til' && references(^._id) && language == $language && !(_id in path('drafts.**'))] | order(publishedAt desc){
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
  language: supportedLanguagesSchema,
  tags: z.array(tagSchema).optional(),
});

const tagTilSchema = tagCommonSchema.extend({
  _type: z.literal('til'),
});
export type QueryTagBySlugTil = z.infer<typeof tagTilSchema>;

const tagPostSchema = tagCommonSchema.extend({
  _type: z.literal('post'),
  subtitle: z.string().optional(),
  description: z.string(),
  featuredImage: featuredImageSchema.optional(),
});
export type QueryTagBySlugPost = z.infer<typeof tagPostSchema>;

const tagBySlugPost = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  posts: z.array(tagPostSchema),
  tils: z.array(tagTilSchema),
});
