import type { QueryPostsAndTilsReturnType } from '@raulmelo/core/dist/types/domains/posts';

export type PostSectionProps = {
  title: string;
  posts:
    | QueryPostsAndTilsReturnType['posts']
    | QueryPostsAndTilsReturnType['tils'];
  checkAllLink: {
    href: string;
    text: string;
  };
};
