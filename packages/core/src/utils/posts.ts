interface IPost {
  publishedAt: Date;
}

export function sortPostByPublishedDate<T extends IPost>(posts: T[]): T[] {
  return [...posts].sort(
    (prev, next) =>
      new Date(next.publishedAt).getTime() -
      new Date(prev.publishedAt).getTime(),
  );
}
