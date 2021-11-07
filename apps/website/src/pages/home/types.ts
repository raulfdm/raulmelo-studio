import { PostBasicProps } from '~/components/PostBasic';

export type PostSectionProps = {
  title: string;
  posts: (PostBasicProps & { id: string })[];
  checkAllLink: {
    href: string;
    text: string;
  };
};
