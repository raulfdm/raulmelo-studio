import type { PortableTextBlock } from '@portabletext/react';
import { SupportedLanguages } from 'src';

export interface IBlogPostBySlugApiResponse {
  _id: string;
  content: PortableTextBlock;
  title: string;
  subtitle?: string;
  description: string;
  publishedAt: string;
  slug: string;
  language: SupportedLanguages;
  featuredImage: IBlogPostBySlugFeaturedImage;
  tags: IBlogPostBySlugPostTag[];
  unsplash: IBlogPostBySlugUnsplash;
  imageCaption?: string;
  series?: IBlogPostBySlugSeries;
}

interface IBlogPostBySlugSeries {
  name: string;
  posts: IBlogPostBySlugSeriesPost[];
}

interface IBlogPostBySlugSeriesPost {
  _id: string;
  seriesCopy: string;
  slug: string;
  publishedAt: Date;
}

interface IBlogPostBySlugFeaturedImage {
  url: string;
  width: number;
  height: number;
}

interface IBlogPostBySlugPostTag {
  _id: string;
  slug: string;
  name: string;
}

interface IBlogPostBySlugUnsplash {
  authorName: string;
  url: string;
}
