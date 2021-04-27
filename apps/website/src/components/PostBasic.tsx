import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { Tags, Tag } from '@components/Tags';
import { getTagUrl } from '@utils/url';
import { FormattedDate } from 'react-intl';

export interface PostBasicProps {
  title: string;
  subtitle?: string;
  url: string;
  as?: React.ElementType;
  publishedAt: string;
  className?: string;
  titleClassName?: string;
  publishedAtClassName?: string;
  tags: {
    name: string;
    slug: string;
    id: string;
  }[];
}
export const PostBasic: React.FC<PostBasicProps> = ({
  title,
  subtitle,
  url,
  publishedAt,
  tags,
  className,
  titleClassName,
  publishedAtClassName,
  as = 'section',
}) => {
  const Component = as;

  return (
    <Component className={className}>
      <Link href={url}>
        <a className="relative inline-block">
          <h3
            className={classNames([
              'font-extrabold',
              'text-xl lg:text-2xl',
              titleClassName,
            ])}
          >
            {title}
          </h3>
        </a>
      </Link>

      <span
        className={classNames([
          'block',
          'text-md',
          'font-sans',
          'mb-2.5',
          publishedAtClassName,
        ])}
      >
        <time dateTime={publishedAt}>
          <FormattedDate
            value={publishedAt}
            year="numeric"
            month="short"
            day="2-digit"
          />
        </time>
      </span>
      {subtitle && (
        <p
          className={classNames([
            'text-lg lg:text-md',
            'text-black dark:text-gray-200',
            'text-opacity-80 dark:text-opacity-100',
          ])}
        >
          {subtitle}
        </p>
      )}
      {tags ? (
        <Tags className="mt-4">
          {tags.map(({ name, slug, id }) => (
            <Tag key={id}>
              <Link href={getTagUrl(slug)}>
                <a className="underline">#{name}</a>
              </Link>
            </Tag>
          ))}
        </Tags>
      ) : null}
    </Component>
  );
};
