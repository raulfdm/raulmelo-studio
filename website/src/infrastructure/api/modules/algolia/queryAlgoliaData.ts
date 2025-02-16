import type { PortableTextBlock } from '@portabletext/types';
import type { SanityClient } from '@sanity/client';
import groq from 'groq';
import { z } from 'zod';

import { SupportedLanguage } from '@raulmelo/core/intl';
import { contentBlockToRawText } from '@/infrastructure/utils/contentBlockToRawText.js';

import {
  queryCodeSnippets,
  type QueryCodeSnippetsReturnType,
} from '../codeSnippets/index.js';

type QueryAlgoliaDataParams = {
  client: SanityClient;
};

export async function queryAlgoliaData({ client }: QueryAlgoliaDataParams) {
  const allPosts = await client.fetch<AlgoliaPost[]>(algoliaPostsQuery);
  const allTils = await client.fetch<AlgoliaTil[]>(algoliaTilsQuery);

  const snippets = await queryCodeSnippets({ client });

  return [
    ...snippets.map(snippetsToAlgoliaObjectAdapter),
    ...allTils.map(async (til) => await objectCreator(til)),
    ...allPosts.map(async (post) => await objectCreator(post)),
  ];

  async function objectCreator(data: AlgoliaContent): Promise<AlgoliaObject> {
    const { _id, content, _type, publishedAt, tags, ...rest } = data;
    const result: AlgoliaObject = {
      _id,
      objectID: `Content_${_id}`,
      excerpt: getExcerpt(await contentBlockToRawText(content)),
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
*[_type== "post"] | order(publishedAt desc){
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
*[_type== "til"] | order(publishedAt desc){
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
  language: SupportedLanguage,
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
  featuredImage: z
    .object({
      height: z.number(),
      url: z.string(),
      width: z.number(),
    })
    .optional(),
  subtitle: z.string().optional(),
});
export type AlgoliaPost = z.infer<typeof algoliaPostsSchema>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const algoliaTilsSchema = commonContentSchema.extend({
  _type: z.literal('til'),
});
export type AlgoliaTil = z.infer<typeof algoliaTilsSchema>;

export type AlgoliaContent = AlgoliaPost | AlgoliaTil;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
