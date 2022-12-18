import groq from 'groq';
import { z } from 'zod';

import type { SupportedLanguages } from '$config/languages';
import { supportedLanguagesSchema } from '$config/languages';
import { client } from '$config/sanity';

export async function queryRssData(language: SupportedLanguages): Promise<Rss> {
  const result = client.fetch(rssQuery, { language: language });

  return rssSchema.parse(result);
}

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
export type RssDataPost = z.infer<typeof dataPostSchema>;

const rssSchema = z.object({
  description: z.string(),
  language: supportedLanguagesSchema,
  siteUrl: z.string(),
  tils: z.array(dataPostSchema),
  posts: z.array(dataPostSchema),
  title: z.string(),
});

export type Rss = z.infer<typeof rssSchema>;
