import { useLocalization } from '@hooks/useLocalization';
import { PostCard } from './PostCard';
import { SupportedLanguages } from '@types-app';
import { getPostUrl, getTagUrl } from '@utils/url';

export type PostCardWrapperProps = {
  post: {
    title: string;
    subtitle?: string;
    slug: string;
    locale: SupportedLanguages;
    date: string;
    featured_image: {
      url: string;
    };
    post_tags?: {
      name: string;
      slug: string;
    }[];
  };
};

export function PostCardWrapper({ post }: PostCardWrapperProps) {
  const { formatDate } = useLocalization();
  return (
    <PostCard
      imageUrl={post.featured_image.url}
      title={post.title}
      subtitle={post.subtitle}
      titleLinkProps={{ locale: post.locale }}
      postUrl={getPostUrl(post.slug)}
      publishDate={formatDate(new Date(post.date), {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      })}
      tags={(post.post_tags ?? []).map((tag) => ({
        name: tag.name,
        href: getTagUrl(tag.slug),
      }))}
    />
  );
}
