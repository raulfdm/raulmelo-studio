import type { PortableTextBlock } from '@portabletext/types';

import type { SupportedLanguages } from '$config/languages';

export interface IUsesApiResponse {
  language: SupportedLanguages;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  seo: IUsesSEO;
  content: PortableTextBlock;
}

interface IUsesSEO {
  title: string;
  description: string;
}
