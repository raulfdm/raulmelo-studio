import { MDXRemoteSerializeResult } from 'next-mdx-remote';

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

export type BlogPostPost = {
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
  posts: BlogPostPost[];
};

export type BlogPostProps = {
  post: BlogPostPost;
  preview: boolean;
  content: MDXRemoteSerializeResult;
};

export type BlogPostPageProps = BlogPostProps & {
  content: MDXRemoteSerializeResult;
  preview: boolean;
};
