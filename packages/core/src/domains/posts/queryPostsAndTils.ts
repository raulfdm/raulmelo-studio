import groq from 'groq';
import { z } from 'zod';

import type { SupportedLanguages } from '$config/languages';
import { supportedLanguagesSchema } from '$config/languages';
import { client } from '$config/sanity';

export async function queryPostsAndTils(
  locale: SupportedLanguages,
  numberOfPosts = 2,
): Promise<PostsAndTils> {
  const params = {
    start: 0,
    end: numberOfPosts - 1,
    language: locale,
  };
  const [posts, tils] = await Promise.all([
    client.fetch(postQuery, params),
    client.fetch(tilQuery, params),
  ]);

  return postsAndTilsSchema.parse({
    posts,
    tils,
  });
}

const postQuery = groq`
*[_type == "post" && language == $language && !(_id in path('drafts.**'))] |order(publishedAt desc)[$start..$end]{
  _id,
  "slug": slug.current,
  publishedAt,
  title,
  subtitle,
  language,
  description,
  "featuredImage": featuredImage.asset->{
    url,
    "height": metadata.dimensions.height,
    "width": metadata.dimensions.width,
  },
  "tags": tags[]->{
    _id,
    name,
    "slug": slug.current
  }
}
`;

const tilQuery = groq`
*[_type == "til" && language == $language && !(_id in path('drafts.**'))] |order(publishedAt desc)[$start..$end]{
  _id,
  title,
  publishedAt,
  language,
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

const featuredImageSchema = z.object({
  width: z.number(),
  height: z.number(),
  url: z.string(),
});

const postSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  publishedAt: z.string(),
  title: z.string(),
  language: supportedLanguagesSchema,
  subtitle: z.string().optional(),
  description: z.string(),
  featuredImage: featuredImageSchema.optional(),
  tags: z.array(tagSchema),
});

const tilSchema = z.object({
  _id: z.string(),
  title: z.string(),
  language: supportedLanguagesSchema,
  publishedAt: z.string(),
  slug: z.string(),
  tags: z.array(tagSchema),
});

const postsAndTilsSchema = z.object({
  posts: z.array(postSchema),
  tils: z.array(tilSchema),
});

type PostsAndTils = z.infer<typeof postsAndTilsSchema>;
