import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import Link from 'next/link';
import { FormattedDate } from 'react-intl';

import { Tag, Tags } from '~/components/Tags';
import { getTagUrl } from '~/utils/url';

const Wrapper = styled.section``;

export const PostBasic = ({
  title,
  subtitle,
  url,
  _type,
  publishedAt,
  tags,
  titleClassName,
  as = 'section',
  className,
}: PostBasicProps) => {
  return (
    <Wrapper as={as} className={className}>
      <Link href={url} passHref>
        <a className="relative inline-block cursor-pointer">
          <h3 className={cx(['font-extrabold', titleClassName])}>{title}</h3>
        </a>
      </Link>

      <div className="flex space-x-4 mb-2.5">
        <span className="block font-sans text-md">
          <time dateTime={publishedAt}>
            <FormattedDate
              value={publishedAt}
              year="numeric"
              month="short"
              day="2-digit"
            />
          </time>
        </span>
        {_type ? (
          <span
            className={cx(
              {
                'bg-indigo-600': _type === 'post',
                'bg-yellow-600': _type === 'til',
              },
              'px-2 rounded-sm min-width[40px] text-center font-bold text-gray-50 uppercase',
            )}
          >
            {_type}
          </span>
        ) : null}
      </div>
      {subtitle && (
        <p className="text-lg lg:text-md text-primary dark:text-gray-200 text-opacity-80 dark:text-opacity-100">
          {subtitle}
        </p>
      )}
      {tags ? (
        <Tags className="mt-4">
          {tags.map(({ name, slug, _id }) => (
            <Tag key={_id}>
              <Link href={getTagUrl(slug)} passHref>
                <a className="underline cursor-pointer">#{name}</a>
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
  _type?: 'post' | 'til';
  className?: string;
  as?: React.ElementType;
  publishedAt: string;
  titleClassName?: string;
  tags: {
    name: string;
    slug: string;
    _id: string;
  }[];
}
