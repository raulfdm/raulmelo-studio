import type { SupportedLanguages } from '$config/languages';

export type ITagBySlugApiResponse = ITagBySlugPostTag[];

export interface ITagBySlugPostTag {
  _id: string;
  slug: string;
  name: string;
  tils: ITagBySlugTilPost[];
  posts: ITagBySlugBlogPost[];
}

interface ITagBySlugCommonPost {
  _id: string;
  publishedAt: string;
  slug: string;
  title: string;
  language: SupportedLanguages;
  tags: ITagBySlugTag[];
}

export interface ITagBySlugTilPost extends ITagBySlugCommonPost {
  _type: 'til';
}

export interface ITagBySlugBlogPost extends ITagBySlugCommonPost {
  _type: 'post';
  subtitle?: string;
  description: string;
  featuredImage: ITagBySlugFeaturedImage;
}

interface ITagBySlugFeaturedImage {
  url: string;
  height: number;
  width: number;
}

interface ITagBySlugTag {
  slug: string;
  _id: string;
  name: string;
}
