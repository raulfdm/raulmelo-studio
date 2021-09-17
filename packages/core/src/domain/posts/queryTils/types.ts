import { SupportedLanguages } from '../../../types';

export interface ITilsApiResponse {
  tils: ITilsTil[];
}

export interface ITilsTil {
  id: string;
  publishedAt: Date;
  title: string;
  locale: SupportedLanguages;
  slug: string;
  tags: ITilsTilTag[];
}

interface ITilsTilTag {
  id: string;
  name: string;
  slug: string;
}
