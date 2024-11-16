import type { SanityClient } from '@sanity/client';
import groq from 'groq';
import { z } from 'zod';

import {
  SUPPORTED_LANGUAGES_WITH_ALL,
  type SupportedLanguageOrAll,
} from '@/infrastructure/config/types/language';
import { SupportedLanguage } from '@raulmelo/core/intl';

type QueryPostsParams = {
  language: SupportedLanguageOrAll;
  client: SanityClient;
};
export async function queryPosts({ language, client }: QueryPostsParams) {
  const languages =
    language === 'all' ? SUPPORTED_LANGUAGES_WITH_ALL : [language];

  const result = await client.fetch(postQuery, { languages });

  return blogPostPageListSchema.parse(result);
}

export type QueryPostsReturnType = Awaited<ReturnType<typeof queryPosts>>;

const postQuery = groq`
*[_type == "post" && language in $languages] | order(publishedAt desc){
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
  language: SupportedLanguage,
  slug: z.string(),
  publishedAt: z.string(),
  title: z.string(),
  subtitle: z.string().nullable(),
  description: z.string(),
  featuredImage: z
    .object({
      width: z.number(),
      height: z.number(),
      url: z.string(),
    })
    .nullable(),
  tags: z
    .array(
      z.object({
        slug: z.string(),
        name: z.string(),
        _id: z.string(),
      }),
    )
    .nullable(),
  series: z
    .object({
      slug: z.string(),
      name: z.string(),
      _id: z.string(),
    })
    .nullable(),
});

const blogPostPageListSchema = z.array(blogPagePostSchema);
