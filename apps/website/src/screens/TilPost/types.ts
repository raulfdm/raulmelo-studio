import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface ITilPostGraphQLResponse {
  tils: ITilPosts;
}

export type ITilPosts = ITilPost[];

type ITilTags = {
  id: string;
  name: string;
  slug: string;
}[];

export interface ITilPost {
  id: string;
  publishedAt: string;
  title: string;
  locale: string;
  slug: string;
  content: string;
  tags: ITilTags;
}

export type ITilPostParsed = ITilPost & {
  content: MDXRemoteSerializeResult;
};
