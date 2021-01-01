import { PostSeriesBlogPost } from '@types-api';

export function sortPostsAscending(
  prevPost: PostSeriesBlogPost,
  nextPost: PostSeriesBlogPost,
) {
  const prevDate = new Date(prevPost.date);
  const nextDate = new Date(nextPost.date);

  if (prevDate > nextDate) {
    return 1;
  }

  if (prevDate < nextDate) {
    return -1;
  }

  return 0;
}
