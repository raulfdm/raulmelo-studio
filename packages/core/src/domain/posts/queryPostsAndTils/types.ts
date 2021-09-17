import { SupportedLanguages } from '../../../types';

export interface IPostsAndTilsApi {
  posts: IPostsAndTilsPost[];
  tils: IPostsAndTilsTil[];
}

export interface IPostsAndTilsTil {
  id: string;
  title: string;
  publishedAt: string;
  slug: string;
  tags: IPostsAndTilsTag[];
}

export interface IPostsAndTilsPost {
  id: string;
  slug: string;
  date: string;
  title: string;
  locale: SupportedLanguages;
  subtitle?: string;
  description: string;
  featured_image: IPostsAndTilsFeaturedImage;
  post_tags: IPostsAndTilsTag[];
}

interface IPostsAndTilsTag {
  slug: string;
  id: string;
  name: string;
}

interface IPostsAndTilsFeaturedImage {
  width: number;
  height: number;
  url: string;
}
