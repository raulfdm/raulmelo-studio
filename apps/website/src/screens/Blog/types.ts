import { SupportedLanguages } from '@types-app';

export interface BlogGraphQLResponse {
  posts: BlogPost[];
}

export interface BlogPost {
  id: string;
  locale: SupportedLanguages;
  slug: string;
  date: string;
  title: string;
  subtitle?: string;
  featured_image: FeaturedImage;
  post_tags: BlogPostTag[];
}

interface FeaturedImage {
  width: number;
  height: number;
  url: string;
}

interface BlogPostTag {
  slug: string;
  id: string;
  name: string;
}
