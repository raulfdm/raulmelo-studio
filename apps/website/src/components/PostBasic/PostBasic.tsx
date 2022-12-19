import type { QueryPostsAndTilsReturnType } from '@raulmelo/core/dist/types/domains/posts';
import classNames from 'classnames';
import Link from 'next/link';
import { FormattedDate } from 'react-intl';

import { Tag, Tags } from '~/components/Tags';
import { getTagUrl } from '~/utils/url';

type PostOrUtil =
  | QueryPostsAndTilsReturnType['posts'][number]
  | QueryPostsAndTilsReturnType['tils'][number];

export type PostBasicProps = Pick<
  PostOrUtil,
  'title' | 'publishedAt' | 'tags'
> & {
  titleClassName?: string;
  className?: string;
  _type?: 'post' | 'til';
  url?: string;
  subtitle?: string;
};

export const PostBasic = ({
  title,
  subtitle,
  url,
  _type,
  publishedAt,
  tags,
  titleClassName,
  className,
}: PostBasicProps) => {
  const titleComp = (
    <h3 className={classNames(['font-extrabold', titleClassName])}>{title}</h3>
  );

  return (
    <section className={className}>
      {renderTitle()}

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
            className={classNames(
              {
                'bg-indigo-600': _type === 'post',
                'bg-yellow-600': _type === 'til',
              },
              'px-2 rounded-sm min-w-[40px] text-center font-bold text-gray-50 uppercase',
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
              <Link href={getTagUrl(slug)} className="underline cursor-pointer">
                #{name}
              </Link>
            </Tag>
          ))}
        </Tags>
      ) : null}
    </section>
  );

  function renderTitle() {
    if (url) {
      return (
        <Link
          href={url}
          className="relative inline-block cursor-pointer"
          title={title}
        >
          {titleComp}
        </Link>
      );
    }

    return titleComp;
  }
};
