import type { SupportedLanguages } from '~/global-types';

export interface IPostsAndTilsApi {
  posts: IPostsAndTilsPost[];
  tils: IPostsAndTilsTil[];
}

export interface IPostsAndTilsTil {
  _id: string;
  title: string;
  language: SupportedLanguages;
  publishedAt: string;
  slug: string;
  tags: IPostsAndTilsTag[];
}

export interface IPostsAndTilsPost {
  _id: string;
  slug: string;
  publishedAt: string;
  title: string;
  language: SupportedLanguages;
  subtitle?: string;
  description: string;
  featuredImage?: IPostsAndTilsFeaturedImage;
  tags: IPostsAndTilsTag[];
}

interface IPostsAndTilsTag {
  _id: string;
  name: string;
  slug: string;
}

interface IPostsAndTilsFeaturedImage {
  width: number;
  height: number;
  url: string;
}
