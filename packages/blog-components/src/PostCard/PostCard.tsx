import classNames from 'classnames';
import React from 'react';
import { ConfiguredLinkProps, configureLink } from '../ConfiguredLink';
import { Tag } from '../Tag';
import { Tags } from '../Tags';

export const PostCard: React.FC<PostCardProps> = ({
  renderImage,
  imageUrl,
  title,
  subtitle,
  publishDate,
  postUrl,
  Link,
  titleLinkProps,
  tags,
}) => {
  const ConfiguredLink = configureLink(Link);

  return (
    <section>
      <div
        className={classNames([
          'relative',
          'rounded-sm shadow-sm',
          'pb-[56.25%]', // 16:9 aspect ratio
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
        <ConfiguredLink
          className="relative inline-block"
          href={postUrl}
          linkProps={titleLinkProps}
        >
          <h3 className={classNames(['font-black', 'text-xl lg:text-lg'])}>
            {title}
          </h3>
        </ConfiguredLink>

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
                <ConfiguredLink className="underline" href={href}>
                  #{name}
                </ConfiguredLink>
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
  Link?: Parameters<typeof configureLink>[0];
  postUrl: string;
  publishDate: string;
  renderImage?: (renderProps: {
    className: string;
    src: string;
  }) => React.ReactNode;
  subtitle?: string;
  tags: { href: string; name: string }[];
  title: string;
  titleLinkProps?: ConfiguredLinkProps['linkProps'];
};
