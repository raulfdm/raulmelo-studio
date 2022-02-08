import { SupportedLanguages } from 'src';

export interface IUsesApiResponse {
  language: SupportedLanguages;
  title: string;
  seo: IUsesSEO;
  content: string;
}

interface IUsesSEO {
  title: string;
  description: string;
}
