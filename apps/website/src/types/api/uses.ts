import { SupportedLanguages } from '@types-app';

interface Seo {
  title: string;
  description: string;
  id: string;
}

export interface UsesApiData {
  language: SupportedLanguages;
  _id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
  seo: Seo;
}
