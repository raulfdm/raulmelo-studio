import type { PortableTextBlock } from '@portabletext/types';
import { type SanityClient } from '@sanity/client';
import groq from 'groq';
import { z } from 'zod';

import { supportedLanguagesSchema } from '@/config';
import { contentBlockToMarkdown } from '@/utils';

import { queryCodeSnippets } from '../codeSnippets';
import { type QueryCodeSnippetsReturnType } from '../codeSnippets';

type QueryAlgoliaDataParams = {
  client: SanityClient;
};

export async function queryAlgoliaData({
  client,
}: QueryAlgoliaDataParams): Promise<AlgoliaObject[]> {
  const posts = await client.fetch(algoliaPostsQuery);
  const tils = await client.fetch(algoliaTilsQuery);
  const snippets = await queryCodeSnippets({ client });

  return [
    ...snippets.map(snippetsToAlgoliaObjectAdapter),
    ...tils.map(objectCreator),
    ...posts.map(objectCreator),
  ];

  function objectCreator(data: AlgoliaContent): AlgoliaObject {
    const { _id, content, _type, publishedAt, tags, ...rest } = data;
    const result: AlgoliaObject = {
      _id,
      objectID: `Content_${_id}`,
      excerpt: getExcerpt(contentBlockToMarkdown(content)),
      date_timestamp: getDateTimestamp(publishedAt),
      tags: tags || [],
      _type,
      publishedAt,
      ...rest,
    };

    if (_type === 'post') {
      result.featuredImage = data.featuredImage;
      result.subtitle = data.subtitle;
    }

    return result;
  }
}

function getExcerpt(content: string): string {
  return content
    .replace(/---/g, '')
    .replace(/\\n/g, '')
    .replace(/#/g, '')
    .slice(0, 5000);
}

function getDateTimestamp(date: string): string {
  return (new Date(date).getTime() / 1000).toFixed(0);
}

const algoliaPostsQuery = groq`
*[_type== "post" && !(_id in path('drafts.**'))] | order(publishedAt desc){
  _id,
  title,
  subtitle,
  publishedAt,
  language,
  _type,
  "slug": slug.current,
  content,
  "tags": tags[]->{
    _id,
    "slug": slug.current,
    name
  },
  "featuredImage": featuredImage.asset->{
    url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height
  }
}
`;

const algoliaTilsQuery = groq`
*[_type== "til" && !(_id in path('drafts.**'))] | order(publishedAt desc){
  _id,
  title,
  publishedAt,
  language,
  _type,
  "slug": slug.current,
  content,
  "tags": tags[]->{
    _id,
    "slug": slug.current,
    name
  }
}
`;

const commonContentSchema = z.object({
  _id: z.string(),
  content: z.any().transform((value) => value as PortableTextBlock),
  language: supportedLanguagesSchema,
  publishedAt: z.string(),
  slug: z.string(),
  tags: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
        slug: z.string(),
      }),
    )
    .optional(),
  title: z.string(),
});

const algoliaPostsSchema = commonContentSchema.extend({
  _type: z.literal('post'),
  featuredImage: z.object({
    height: z.number(),
    url: z.string(),
    width: z.number(),
  }),
  subtitle: z.string().optional(),
});
export type AlgoliaPosts = z.infer<typeof algoliaPostsSchema>;

const algoliaTilsSchema = commonContentSchema.extend({
  _type: z.literal('til'),
});
export type AlgoliaTils = z.infer<typeof algoliaTilsSchema>;

export type AlgoliaContent = AlgoliaPosts | AlgoliaTils;

const algoliaObjectSchema = z.object({
  _id: z.string(),
  objectID: z.string(),
  _type: z.union([
    z.literal('post'),
    z.literal('til'),
    z.literal('codeSnippet'),
  ]),
  excerpt: z.string(),
  date_timestamp: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  publishedAt: z.string(),
  slug: z.string(),
  tags: commonContentSchema.pick({ tags: true }).required().shape.tags,
  featuredImage: algoliaPostsSchema
    .pick({ featuredImage: true })
    .shape.featuredImage.optional(),
});
export type AlgoliaObject = z.infer<typeof algoliaObjectSchema>;

function snippetsToAlgoliaObjectAdapter(
  codeSnippet: QueryCodeSnippetsReturnType[number],
): AlgoliaObject {
  const { _id, publishedAt, tags, description, ...rest } = codeSnippet;

  const result: AlgoliaObject = {
    _id,
    objectID: `Content_${_id}`,
    excerpt: description,
    date_timestamp: getDateTimestamp(publishedAt),
    tags: tags || [],
    _type: 'codeSnippet',
    publishedAt,
    ...rest,
  };

  return result;
}
