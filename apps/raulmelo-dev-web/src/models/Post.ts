import { PostApiData } from 'src/types/api/posts';

export type PostModel = ReturnType<typeof Post>;

export function Post(post: PostApiData) {
  return {
    ...post,
    get postUri() {
      return `/blog/${post.slug}`;
    },
  };
}
