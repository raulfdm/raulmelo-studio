import type { PortableTextBlock } from '@portabletext/types';

import type { SupportedLanguages } from '$config/languages';

interface CommonContent {
  _id: string;
  content: PortableTextBlock;
  language: SupportedLanguages;
  publishedAt: string;
  slug: string;
  tags?: Tag[];
  title: string;
}

export interface IAlgoliaPosts extends CommonContent {
  _type: 'post';
  featuredImage?: FeaturedImage;
  subtitle?: string;
}

export interface IAlgoliaTils extends CommonContent {
  _type: 'til';
}

export type IAlgoliaContent = IAlgoliaTils | IAlgoliaPosts;

interface FeaturedImage {
  height: number;
  url: string;
  width: number;
}

interface Tag {
  _id: string;
  name: string;
  slug: string;
}
