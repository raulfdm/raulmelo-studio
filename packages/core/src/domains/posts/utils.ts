interface IPost {
  publishedAt: string;
}

export function sortPostsByPublishedDate(posts: IPost[]): IPost[] {
  return [...posts].sort(
    (prev, next) =>
      new Date(next.publishedAt).getTime() -
      new Date(prev.publishedAt).getTime(),
  );
}
