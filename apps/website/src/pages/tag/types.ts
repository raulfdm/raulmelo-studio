import { SupportedLanguages } from '@raulmelo/core';
import {
  ITagBySlugBlogPost,
  ITagBySlugPostTag,
  ITagBySlugTilPost,
} from '@raulmelo/core/dist/types/domains/tag/queryTagBySlug/types';

export type TagPageProps = {
  tag: ITagBySlugPostTag;
  content: ITagPageContent;
};

type ITagPageContent = (ITagBySlugBlogPost | ITagBySlugTilPost)[];

export interface TagPageParams {
  params: {
    slug: string;
  };
  locale: SupportedLanguages;
}
