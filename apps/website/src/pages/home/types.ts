import type { PostBasicProps } from '~/components/PostBasic';

export type PostSectionProps = {
  title: string;
  posts: (PostBasicProps & { _id: string })[];
  checkAllLink: {
    href: string;
    text: string;
  };
};
