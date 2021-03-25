import { PostTags } from '@components/PostTags';
import { SupportedLanguages } from '@types-app';
import { getPostUrl } from '@utils/url';
import { isNotNilNorEmpty } from '@utils/utilities';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FormattedDate } from 'react-intl';

type Post = {
  title: string;
  subtitle: string;
  date: string;
  slug: string;
  language: SupportedLanguages;
  post_tags: { id: string; slug: string; name: string }[];
  featured_image: {
    url: string;
  };
};

type PostCardProps = {
  post: Post;
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    featured_image,
    title,
    subtitle,
    date,
    post_tags,
    slug,
    language,
  } = post;

  /**
   * For the tags, every post only has the tags id.
   * Which is not the case for home page where we have an array of tag objects
   * with all tag info.
   */
  const shouldRenderTag =
    isNotNilNorEmpty(post_tags) && typeof post_tags[0] !== 'string';

  return (
    <article className="mb-10">
      {featured_image && (
        <div className="relative h-64 sm:h-64 md:h-80 rounded-sm shadow-sm">
          <Image
            className="object-cover rounded-sm"
            src={featured_image.url}
            layout="fill"
          />
        </div>
      )}
      <div>
        <Link href={getPostUrl(slug)} data-testid="post-card" locale={language}>
          <a className="relative inline-block">
            <h3 className="font-semibold text-xl md:text-3xl mt-3">{title}</h3>
          </a>
        </Link>

        <span className="block text-sm md:text-lg font-sans mb-2.5">
          <time dateTime={date}>
            <FormattedDate
              value={new Date(date)}
              year="numeric"
              month="short"
              day="2-digit"
            />
          </time>
        </span>
        {subtitle && (
          <p className="text-lg md:text-2xl font-medium text-gray-500 dark:text-gray-200">
            {subtitle}
          </p>
        )}
        {shouldRenderTag && <PostTags tags={post_tags} />}
      </div>
    </article>
  );
};
