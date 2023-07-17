import type { SanityClient } from '@sanity/client';
import groq from 'groq';
import { z } from 'zod';

import { type SupportedLanguages, supportedLanguagesSchema } from '@/config';

type QueryRssDataParams = {
  language: SupportedLanguages;
  client: SanityClient;
};

export async function queryRssData({ language, client }: QueryRssDataParams) {
  const result = await client.fetch(rssQuery, { language: language });

  return rssSchema.parse(result);
}

export type QueryRssDataReturnType = Awaited<ReturnType<typeof queryRssData>>;

const rssQuery = groq`
*[_type=="rss" && language == $language][0]{
  title,
  description,
  language,
  "siteUrl": *[_type=="siteSettings"][0].url,
  "tils": *[_type=='til' && language == $language && !(_id in path('drafts.**'))] | order(publishedAt desc){
    "slug": slug.current,
    publishedAt,
    title,
    "urlPrefix": "til"
  },
  "posts": *[_type=='post' && language == $language && !(_id in path('drafts.**'))] | order(publishedAt desc){
    "slug": slug.current,
    publishedAt,
    title,
    description,
    "urlPrefix": "blog"
  }
}
`;

const dataPostSchema = z.object({
  description: z.string().optional(),
  publishedAt: z.string(),
  slug: z.string(),
  title: z.string(),
  urlPrefix: z.union([z.literal('blog'), z.literal('til')]),
});

const rssSchema = z.object({
  description: z.string(),
  language: supportedLanguagesSchema,
  siteUrl: z.string(),
  tils: z.array(dataPostSchema),
  posts: z.array(dataPostSchema),
  title: z.string(),
});
