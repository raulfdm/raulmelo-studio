import type { PortableTextBlock } from '@portabletext/types';

import type { SupportedLanguages } from '~/global-types';

export type ITilsApiResponse = ITilsTil[];
export interface ITilsTil {
  _id: string;
  publishedAt: string;
  title: string;
  language: SupportedLanguages;
  content: PortableTextBlock;
  slug: string;
  tags: ITilsTilTag[];
}

interface ITilsTilTag {
  _id: string;
  name: string;
  slug: string;
}
