import type { PortableTextBlock } from '@portabletext/types';
import type { SanityClient } from '@sanity/client';
import groq from 'groq';
import { z } from 'zod';

import { supportedLanguagesSchema } from '@/config';

type QueryPostBySlugParams = {
  slug: string;
  client: SanityClient;
  preview?: boolean;
};

export async function queryPostBySlug({
  slug,
  client,
  preview = false,
}: QueryPostBySlugParams) {
  const extendedClient = client.withConfig({
    useCdn: preview === false,
    perspective: preview ? 'previewDrafts' : 'published',
  });

  const [post] = await extendedClient.fetch<BlogPost[]>(postQuery, {
    slug,
    preview,
  });

  const parseResult = blogPostBySlugSchema.safeParse(post);

  if (!parseResult.success) {
    console.error(parseResult.error.toString());
    return null;
  }

  return parseResult.data;
}

export type QueryPostBySlugReturnType = Awaited<
  ReturnType<typeof queryPostBySlug>
>;

const postQuery = groq`
*[_type=="post" && slug.current == $slug]{
  _id,
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
  title,
  subtitle,
  description,
  publishedAt,
  "slug": slug.current,
  language,
  "featuredImage": featuredImage.asset->{
    url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height,
  },
  "tags": tags[]->{
    _id,
    name,
    "slug": slug.current
  },
  unsplash,
  imageCaption,
  "series": *[_type=='postSeries' && references(^._id)][0]{
    name,
    "posts": posts[]->{
      _id,
      seriesCopy,
      "slug": slug.current,
      publishedAt
    },
  },

  "relatedPosts": relatedPosts[] -> {
    _type,
    _id,
    title,
    "lang": language,
    "slug": slug.current,
    publishedAt,
    "tags": tags[]->{
      _id,
      name,
      "slug": slug.current
    },
  }
}
`;

const seriesPostSchema = z.object({
  _id: z.string(),
  seriesCopy: z.string(),
  slug: z.string(),
  publishedAt: z.string(),
});

const featuredImageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

const postTagSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  name: z.string(),
});

const unsplashSchema = z.object({
  authorName: z.string(),
  url: z.string(),
});

const seriesSchema = z.object({
  name: z.string(),
  posts: z.array(seriesPostSchema),
});

const relatedPostSchema = z.object({
  _id: z.string(),
  _type: z.enum(['post', 'til']),
  lang: supportedLanguagesSchema,
  publishedAt: z.string(),
  slug: z.string(),
  tags: z.array(postTagSchema).nullable(),
  title: z.string(),
});

const blogPostBySlugSchema = z.object({
  _id: z.string(),
  content: z.any().transform((value) => value as PortableTextBlock),
  description: z.string(),
  featuredImage: featuredImageSchema.nullable(),
  imageCaption: z.string().nullable(),
  language: supportedLanguagesSchema,
  publishedAt: z.string(),
  series: seriesSchema.nullable(),
  slug: z.string(),
  subtitle: z.string().nullable(),
  tags: z.array(postTagSchema).nullable(),
  title: z.string(),
  unsplash: unsplashSchema.nullable(),
  relatedPosts: z
    .array(relatedPostSchema)
    .nullable()
    .transform((value) => value ?? []),
});

type BlogPost = z.infer<typeof blogPostBySlugSchema>;
