import { SupportedLanguages } from '@types-app';

export interface UsesPageApi {
  locale: SupportedLanguages;
  content: string;
  title: string;
  seo: { title: string; description: string };
}

export interface UsesPageStaticPropsResponse {
  use: UsesPageApi;
}
