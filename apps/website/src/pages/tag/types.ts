import type { SupportedLanguages } from '@raulmelo/core';
import type {
  TagPost,
  TagTil,
} from '@raulmelo/core/dist/types/domains/tag/queryTagBySlug';

export type TagPageProps = {
  tag: TagPost['tags'][number];
  content: ITagPageContent;
};

type ITagPageContent = (TagPost | TagTil)[];

export interface TagPageParams {
  params: {
    slug: string;
  };
  locale: SupportedLanguages;
}
