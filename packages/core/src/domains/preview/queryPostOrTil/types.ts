import { SupportedLanguages } from '../../../types';

export interface IQueryPostOrTilApiResponse {
  tils: IQueryPostOrTil[];
  posts: IQueryPostOrTil[];
}

export interface IQueryPostOrTil {
  slug: string;
  language: SupportedLanguages;
  _type: 'post' | 'til';
}
