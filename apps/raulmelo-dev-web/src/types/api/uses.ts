import { SupportedLanguages } from '@types-app';

export interface UsesDataShape {
  language: SupportedLanguages;
  _id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export type UsesApiData = UsesDataShape[];
