import type { SupportedLanguages } from '~/global-types';

export interface IQueryPostOrTilApiResponse {
  tils: IQueryPostOrTil[];
  posts: IQueryPostOrTil[];
}

export interface IQueryPostOrTil {
  slug: string;
  language: SupportedLanguages;
  _type: 'post' | 'til';
}
