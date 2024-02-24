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
