import { PostsApiData } from './posts';

export interface PostTagApiData {
  _id: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  slug: string;
  name: string;
  id: string;
  blog_posts: PostsApiData;
}

// TODO: remove that
export type PostsTagApiData = PostTagApiData[];
