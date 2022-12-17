import { z } from 'zod';

import { supportedLanguagesSchema } from '~/global-types';

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

export const blogPostBySlugSchema = z.object({
  _id: z.string(),
  content: z.any(),
  description: z.string(),
  featuredImage: featuredImageSchema.optional(),
  imageCaption: z.string().optional(),
  language: supportedLanguagesSchema,
  publishedAt: z.string(),
  series: seriesSchema.optional(),
  slug: z.string(),
  subtitle: z.string().optional(),
  tags: z.array(postTagSchema),
  title: z.string(),
  unsplash: unsplashSchema.optional(),
});

export type BlogPostBySlug = z.infer<typeof blogPostBySlugSchema>;
