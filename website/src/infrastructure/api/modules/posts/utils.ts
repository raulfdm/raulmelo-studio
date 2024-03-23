/**
 * Sort all posts (or contents) by their published date in descending order.
 * This is useful when mixing the content (post + tils) into a single list.
 */
export function sortPostsByPublishedDate<
  T extends {
    publishedAt: Date | string;
  },
>(posts: T[]): T[] {
  return [...posts].sort(
    (prev, next) =>
      new Date(next.publishedAt).getTime() -
      new Date(prev.publishedAt).getTime(),
  );
}
