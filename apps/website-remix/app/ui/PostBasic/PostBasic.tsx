import { getTagUrl } from '$infrastructure/utils/url';
import { Tag, Tags } from '$ui/Tags';
import { Link } from '@remix-run/react';
import classNames from 'classnames';
import { FormattedDate } from 'react-intl';

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
  return (
    <section className={className}>
      <Link to={url} className="relative inline-block cursor-pointer">
        <h3 className={classNames(['font-extrabold', titleClassName])}>
          {title}
        </h3>
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
              <Link to={getTagUrl(slug)} className="underline cursor-pointer">
                #{name}
              </Link>
            </Tag>
          ))}
        </Tags>
      ) : null}
    </section>
  );
};

export interface PostBasicProps {
  title: string;
  subtitle?: string;
  url: string;
  _type?: 'post' | 'til';
  className?: string;
  publishedAt: string;
  titleClassName?: string;
  tags: {
    name: string;
    slug: string;
    _id: string;
  }[];
}
