import { SupportedLanguages } from '@types-app';

export interface FeaturedImage {
  width: number;
  height: number;
  url: string;
}

export interface PostSerie {
  slug: string;
  name: string;
  id: string;
}

export interface PostTag {
  slug: string;
  id: string;
  name: string;
}

export interface Post {
  id: string;
  language: SupportedLanguages;
  slug: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  featured_image: FeaturedImage;
  post_serie: PostSerie;
  post_tags: PostTag[];
}

export interface BlogPageGraphQLResponse {
  posts: Post[];
}

export type HomePageProps = BlogPageGraphQLResponse & {
  locale: SupportedLanguages;
  pageNumber: number;
  numberOfPages: number;
};
