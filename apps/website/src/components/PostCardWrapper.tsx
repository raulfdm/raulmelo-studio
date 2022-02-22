import { SupportedLanguages } from '@raulmelo/core';

import { useLocalization } from '~/hooks/useLocalization';
import { getPostUrl, getTagUrl } from '~/utils/url';

import { PostCard } from './PostCard';

export type PostCardWrapperProps = {
  post: {
    title: string;
    subtitle?: string;
    slug: string;
    language: SupportedLanguages;
    publishedAt: string;
    featuredImage?: {
      url: string;
    };
    tags?: {
      name: string;
      slug: string;
      _id: string;
    }[];
  };
};

export function PostCardWrapper({ post }: PostCardWrapperProps) {
  const { formatDate } = useLocalization();
  return (
    <PostCard
      imageUrl={post.featuredImage?.url}
      title={post.title}
      subtitle={post.subtitle}
      titleLinkProps={{ locale: post.language }}
      postUrl={getPostUrl(post.slug)}
      publishDate={formatDate(new Date(post.publishedAt), {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      })}
      tags={(post.tags ?? []).map((tag) => ({
        name: tag.name,
        href: getTagUrl(tag.slug),
      }))}
    />
  );
}
