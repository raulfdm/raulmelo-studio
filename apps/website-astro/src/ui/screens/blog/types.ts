import type { domains } from '@raulmelo/core';

export type PostBySlug = Awaited<
  ReturnType<typeof domains.posts.queryPostBySlug>
>;
