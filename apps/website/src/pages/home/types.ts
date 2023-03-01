import type { QueryPostsAndTilsReturnType } from '@raulmelo/core/domains';

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
