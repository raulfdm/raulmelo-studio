import { SupportedLanguages } from '../../../types';

export interface IBlogPageApiResponse {
  posts: IBlogPagePost[];
}

export interface IBlogPagePost {
  id: string;
  locale: SupportedLanguages;
  slug: string;
  date: string;
  title: string;
  subtitle?: string;
  description: string;
  featured_image: IBlogPageFeaturedImage;
  post_serie: IBlogPagePostSerieClass | null;
  post_tags: IBlogPagePostSerieClass[];
}

interface IBlogPageFeaturedImage {
  width: number;
  height: number;
  url: string;
}

interface IBlogPagePostSerieClass {
  slug: string;
  name: string;
  id: string;
}
