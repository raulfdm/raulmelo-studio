import { PostsApiData } from '@types-api';

export function sortDescPostsByDate(posts: PostsApiData) {
  return posts.sort(
    (prev, curr) =>
      new Date(curr.date).getTime() - new Date(prev.date).getTime(),
  );
}
