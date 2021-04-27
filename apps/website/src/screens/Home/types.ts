import { PostBasicProps } from '@components/PostBasic';
import { SupportedLanguages } from '@types-app';

export interface IHomeGraphQLResponse {
  posts: IHomePost[];
  tils: Til[];
}

export interface IHomePost {
  id: string;
  slug: string;
  date: string;
  title: string;
  locale: SupportedLanguages;
  subtitle?: string;
  description: string;
  featured_image: FeaturedImage;
  post_tags: HomePostTag[];
}

export interface HomePostTag {
  slug: string;
  id: string;
  name: string;
}

export interface Til {
  id: string;
  title: string;
  publishedAt: string;
  slug: string;
  tags: HomePostTag[];
}

interface FeaturedImage {
  width: number;
  height: number;
  url: string;
}

export type PostSectionProps = {
  title: string;
  posts: (PostBasicProps & { id: string })[];
  checkAllLink: {
    href: string;
    text: string;
  };
};
