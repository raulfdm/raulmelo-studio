import { MdxRemoteSource } from '@types-app';

type PostSeriesPosts = {
  id: string;
  copy: string;
  uri: string;
  date: string;
};

type PostTagsPosts = {
  id: string;
  slug: string;
  name: string;
};

export type BlogPostGraphQL = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  slug: string;
  unsplash?: {
    authorName: string;
    url: string;
  };
  content: string;
  featured_image: {
    url: string;
    width: number;
    height: number;
  };
  featured_image_caption: string;
  post_tags: PostTagsPosts[];
  series?: {
    name: string;
    posts: PostSeriesPosts[];
  };
};

export type BlogPostGraphQLResponse = {
  posts: BlogPostGraphQL[];
};

export type BlogPageProps = {
  post: BlogPostGraphQL;
};

export type BlogPostPage = BlogPageProps & {
  content: MdxRemoteSource;
};
