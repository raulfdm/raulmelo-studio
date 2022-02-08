import { SupportedLanguages } from 'src';

export interface ITilBySlugApiResponse {
  _id: string;
  publishedAt: string;
  title: string;
  language: SupportedLanguages;
  slug: string;
  content: string;
  tags: Tag[];
}

interface Tag {
  _id: string;
  name: string;
  slug: string;
}
