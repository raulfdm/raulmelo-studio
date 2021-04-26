import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { Tag } from '../Tag';
import { Tags } from '../Tags';

export const PostCard: React.FC<PostCardProps> = ({
  renderImage,
  imageUrl,
  title,
  subtitle,
  publishDate,
  postUrl,
  titleLinkProps,
  tags,
}) => {
  return (
    <section>
      <div
        className={classNames([
          'relative',
          'rounded-sm shadow-sm',
          'aspect-w-16 aspect-h-9',
        ])}
      >
        {renderImage ? (
          renderImage({
            className: 'object-cover rounded-sm',
            src: imageUrl,
          })
        ) : (
          <img
            className="object-cover rounded-sm m-auto min-w-full max-w-full min-h-full max-h-full absolute"
            src={imageUrl}
          />
        )}
      </div>
      <div className="my-4 md:my-3">
        <Link href={postUrl}>
          <a className="relative inline-block" {...titleLinkProps}>
            <h3 className={classNames(['font-black', 'text-xl lg:text-lg'])}>
              {title}
            </h3>
          </a>
        </Link>

        <span
          className={classNames([
            'block',
            'text-md lg:text-base',
            'font-sans',
            'mb-2.5',
          ])}
        >
          <time dateTime={publishDate}>{publishDate}</time>
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
            {tags.map(({ name, href }) => (
              <Tag key={name}>
                <Link href={href}>
                  <a className="underline">#{name}</a>
                </Link>
              </Tag>
            ))}
          </Tags>
        ) : null}
      </div>
    </section>
  );
};

export type PostCardProps = {
  imageUrl: string;
  postUrl: string;
  publishDate: string;
  renderImage?: (renderProps: {
    className: string;
    src: string;
  }) => React.ReactNode;
  subtitle?: string;
  tags: { href: string; name: string }[];
  title: string;
  // TODO: fix this type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  titleLinkProps?: any;
};
