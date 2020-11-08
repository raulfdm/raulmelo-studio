import { PostApi } from 'src/types/api/posts';

export type PostModel = ReturnType<typeof Post>;

export function Post(post: PostApi) {
  return {
    ...post,
    get postUri() {
      return `/blog/${post.slug}`;
    },
  };
}
