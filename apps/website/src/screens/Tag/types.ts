import { SupportedLanguages } from '@types-app';

export interface ITagPageGraphQLResponse {
  postTags: IPostTag[];
}

export interface IPostTag {
  id: string;
  slug: string;
  name: string;
  til_posts: ITagTilPost[];
  blog_posts: ITagBlogPost[];
}

export interface ITagTilPost {
  publishedAt: string;
  id: string;
  slug: string;
  title: string;
  tags: Tag[];
}

interface Tag {
  slug: string;
  id: string;
  name: string;
}

export interface ITagBlogPost {
  id: string;
  language: SupportedLanguages;
  slug: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  featured_image: IFeaturedImage;
  post_tags: Tag[];
}

export interface IFeaturedImage {
  url: string;
  height: number;
  width: number;
}
