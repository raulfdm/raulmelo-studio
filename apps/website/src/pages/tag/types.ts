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

type ITagPageContent = ITagPagePostOrTil[];

type ITagPagePostOrTil = IEnhancedTil | IEnhancedPost;

type IEnhancedPost = ITagBySlugBlogPost & IPostType;

type IEnhancedTil = ITagBySlugTilPost & IPostType;

interface IPostType {
  type: 'post' | 'til';
}

export interface TagPageParams {
  params: {
    slug: string;
  };
  locale: SupportedLanguages;
}
