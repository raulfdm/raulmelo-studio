import { useLocalization } from '@hooks/useLocalization';
import { PostCard } from '@raulfdm/blog-components';
import { SupportedLanguages } from '@types-app';
import { getPostUrl, getTagUrl } from '@utils/url';
import Image from 'next/image';
import Link from 'next/link';

export type PostCardWrapperProps = {
  post: {
    title: string;
    subtitle?: string;
    slug: string;
    language: SupportedLanguages;
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
      Link={Link}
      renderImage={(props) => <Image {...props} layout="fill" />}
      titleLinkProps={{ locale: post.language }}
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
