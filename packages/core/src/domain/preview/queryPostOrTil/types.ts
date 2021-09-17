import { SupportedLanguages } from '../../../types';

export interface IQueryPostOrTilApiResponse {
  tils: IQueryPostOrTil[];
  posts: IQueryPostOrTil[];
}

export interface IPreviewPostOrTil extends IQueryPostOrTil {
  type: 'post' | 'til';
}

interface IQueryPostOrTil {
  slug: string;
  locale: SupportedLanguages;
}
