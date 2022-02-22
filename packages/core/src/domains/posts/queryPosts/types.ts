import { SupportedLanguages } from '../../../types';

export type IBlogPageApiResponse = IBlogPagePost[];

export interface IBlogPagePost {
  _id: string;
  language: SupportedLanguages;
  slug: string;
  publishedAt: string;
  title: string;
  subtitle?: string;
  description: string;
  featuredImage?: IBlogPageFeaturedImage;
  tags: IBlogPagePostTags[];
  series?: IBlogPageSeries;
}

interface IBlogPageFeaturedImage {
  width: number;
  height: number;
  url: string;
}

interface IBlogPageSeries {
  slug: string;
  name: string;
  _id: string;
}
interface IBlogPagePostTags {
  slug: string;
  name: string;
  _id: string;
}
