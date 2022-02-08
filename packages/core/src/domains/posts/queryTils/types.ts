import { SupportedLanguages } from '../../../types';

export type ITilsApiResponse = ITilsTil[];
export interface ITilsTil {
  _id: string;
  publishedAt: string;
  title: string;
  language: SupportedLanguages;
  slug: string;
  tags: ITilsTilTag[];
}

interface ITilsTilTag {
  _id: string;
  name: string;
  slug: string;
}
