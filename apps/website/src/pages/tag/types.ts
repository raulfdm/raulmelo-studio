import type { SupportedLanguages } from '@raulmelo/core';
import type {
  QueryTagBySlugPost,
  QueryTagBySlugTil,
} from '@raulmelo/core/dist/types/domains/tag/queryTagBySlug';

type TagOrPost = QueryTagBySlugPost | QueryTagBySlugTil;

type ITagPageContent = TagOrPost[];

export type TagPageProps = {
  tag: NonNullable<QueryTagBySlugPost['tags']>[number];
  content: ITagPageContent;
};

export interface TagPageParams {
  params: {
    slug: string;
  };
  locale: SupportedLanguages;
}
