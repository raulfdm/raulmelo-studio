import Link from 'next/link';
import tw, { styled, TwStyle } from 'twin.macro';
import React from 'react';
import { Tags, Tag } from '@components/Tags';
import { getTagUrl } from '@utils/url';
import { FormattedDate } from 'react-intl';

const Wrapper = styled.section``;

const styles = {
  titleLink: tw`relative inline-block cursor-pointer`,
  title: tw`font-extrabold`,
  metaWrapper: tw`flex space-x-4 mb-2.5`,
  typeBase: tw`px-2 rounded-sm min-width[40px] text-center font-bold text-gray-50`,
  type: {
    post: tw`bg-indigo-600`,
    til: tw`bg-yellow-600`,
  },
  publishedAt: tw`block text-md font-sans`,
  subtitle: tw`text-lg lg:text-md text-primary dark:text-gray-200 text-opacity-80 dark:text-opacity-100`,
  tags: tw`mt-4`,
  tagLink: tw`underline cursor-pointer`,
};

export const PostBasic: React.FC<PostBasicProps> = ({
  title,
  subtitle,
  url,
  type,
  publishedAt,
  tags,
  titleClassName,
  as = 'section',
  className,
}) => {
  return (
    <Wrapper as={as} css={className}>
      <Link href={url} passHref>
        <a css={styles.titleLink}>
          <h3 css={[styles.title, titleClassName]}>{title}</h3>
        </a>
      </Link>

      <div css={styles.metaWrapper}>
        <span css={styles.publishedAt}>
          <time dateTime={publishedAt}>
            <FormattedDate
              value={publishedAt}
              year="numeric"
              month="short"
              day="2-digit"
            />
          </time>
        </span>
        {type ? (
          <span css={[styles.type[type], styles.typeBase]}>{type}</span>
        ) : null}
      </div>
      {subtitle && <p css={styles.subtitle}>{subtitle}</p>}
      {tags ? (
        <Tags css={styles.tags}>
          {tags.map(({ name, slug, id }) => (
            <Tag key={id}>
              <Link href={getTagUrl(slug)} passHref>
                <a css={styles.tagLink}>#{name}</a>
              </Link>
            </Tag>
          ))}
        </Tags>
      ) : null}
    </Wrapper>
  );
};

export interface PostBasicProps {
  title: string;
  subtitle?: string;
  url: string;
  type?: 'post' | 'til';
  className?: string | TwStyle;
  as?: React.ElementType;
  publishedAt: string;
  titleClassName?: string | TwStyle;
  tags: {
    name: string;
    slug: string;
    id: string;
  }[];
}
