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
    <article className="mb-10">
      <div className="relative h-64 sm:h-64 md:h-80 rounded-sm shadow-sm">
        {renderImage ? (
          renderImage({
            className: 'object-cover rounded-sm',
            layout: 'fill',
            src: imageUrl,
          })
        ) : (
          <img
            className="object-cover rounded-sm m-auto min-w-full max-w-full min-h-full max-h-full absolute"
            src={imageUrl}
          />
        )}
      </div>
      <div>
        <ConfiguredLink
          className="relative inline-block"
          href={postUrl}
          linkProps={titleLinkProps}
        >
          <h3 className="font-semibold text-xl md:text-3xl mt-3">{title}</h3>
        </ConfiguredLink>

        <span className="block text-sm md:text-lg font-sans mb-2.5">
          <time dateTime={publishDate}>{publishDate}</time>
        </span>
        {subtitle && (
          <p className="text-lg md:text-2xl font-medium text-gray-500 dark:text-gray-200">
            {subtitle}
          </p>
        )}
        {tags ? (
          <Tags>
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
    </article>
  );
};

export type PostCardProps = {
  imageUrl: string;
  Link?: Parameters<typeof configureLink>[0];
  postUrl: string;
  publishDate: string;
  renderImage?: (renderProps: {
    className: string;
    layout: 'fill';
    src: string;
  }) => React.ReactNode;
  subtitle?: string;
  tags: { href: string; name: string }[];
  title: string;
  titleLinkProps?: ConfiguredLinkProps['linkProps'];
};
