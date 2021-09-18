import { SupportedLanguages } from '../../../types';

export interface IBlogPageApiResponse {
  posts: IBlogPagePost[];
}

interface IBlogPagePost {
  id: string;
  locale: SupportedLanguages;
  slug: string;
  date: Date;
  title: string;
  subtitle: null | string;
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
