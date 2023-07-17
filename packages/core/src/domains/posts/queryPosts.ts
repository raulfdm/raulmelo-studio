import type { SanityClient } from '@sanity/client';
import groq from 'groq';
import { z } from 'zod';

import {
  SUPPORTED_LANGUAGES,
  supportedLanguagesSchema,
  type SupportedLanguagesWithAll,
} from '@/config';

type QueryPostsParams = {
  language: SupportedLanguagesWithAll;
  client: SanityClient;
};
export async function queryPosts({ language, client }: QueryPostsParams) {
  const languages = language === 'all' ? SUPPORTED_LANGUAGES : [language];

  const result = await client.fetch(postQuery, { languages });

  return blogPostPageListSchema.parse(result);
}

export type QueryPostsReturnType = Awaited<ReturnType<typeof queryPosts>>;

const postQuery = groq`
*[_type == "post" && language in $languages && !(_id in path('drafts.**'))] | order(publishedAt desc){
  _id,
  language,
  "slug": slug.current,
  publishedAt,
  title,
  subtitle,
  description,
  "tags": tags[]->{
    _id,
    name,
    "slug": slug.current
  },
  "featuredImage": featuredImage.asset->{
    url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height,
  },
  "series": *[_type=='postSeries' && references(^._id)][0]{
    _id,
    name,
    "slug": slug.current
  }
}
`;

const blogPagePostSchema = z.object({
  _id: z.string(),
  language: supportedLanguagesSchema,
  slug: z.string(),
  publishedAt: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  featuredImage: z
    .object({
      width: z.number(),
      height: z.number(),
      url: z.string(),
    })
    .optional(),
  tags: z
    .array(
      z.object({
        slug: z.string(),
        name: z.string(),
        _id: z.string(),
      }),
    )
    .optional(),
  series: z
    .object({
      slug: z.string(),
      name: z.string(),
      _id: z.string(),
    })
    .optional(),
});

const blogPostPageListSchema = z.array(blogPagePostSchema);
