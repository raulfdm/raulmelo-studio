import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import tw from 'twin.macro';

import { Tag, Tags } from '../Tags';

const styles = {
  imageWrapper: tw`relative rounded-sm shadow-sm aspect-w-16 aspect-h-9`,
  bodyWrapper: tw`my-4 md:my-3`,
  image: tw`object-cover rounded-sm`,
  title: tw`text-xl font-black lg:text-lg`,
  titleLink: tw`relative inline-block cursor-pointer`,
  publishedAt: tw`block text-md lg:text-base font-sans mb-2.5`,
  subtitle: tw`text-lg lg:text-md text-primary dark:text-gray-200 text-opacity-80 dark:text-opacity-100`,
  tags: tw`mt-4`,
  tag: tw`underline cursor-pointer`,
};

export const PostCard: React.FC<PostCardProps> = ({
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
      {imageUrl ? (
        <div css={styles.imageWrapper}>
          <Image src={imageUrl} layout="fill" css={styles.image} />
        </div>
      ) : null}
      <div css={styles.bodyWrapper}>
        <Link href={postUrl} passHref>
          <a css={styles.titleLink} {...titleLinkProps}>
            <h3 css={styles.title}>{title}</h3>
          </a>
        </Link>

        <span css={styles.publishedAt}>
          <time dateTime={publishDate}>{publishDate}</time>
        </span>
        {subtitle && <p css={styles.subtitle}>{subtitle}</p>}
        {tags ? (
          <Tags css={styles.tags}>
            {tags.map(({ name, href }) => (
              <Tag key={name}>
                <Link href={href} passHref>
                  <a css={styles.tag}>#{name}</a>
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
  imageUrl?: string;
  postUrl: string;
  publishDate: string;
  subtitle?: string;
  tags: { href: string; name: string }[];
  title: string;
  // TODO: fix this type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  titleLinkProps?: any;
};
