import type { IPostsAndTilsPost } from '@raulmelo/core/dist/types/domains/posts';
import { ArrowRightIcon } from '@raulmelo/ui';
import classNames from 'classnames';
import { m } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

import { useLocalization } from '~/hooks/useLocalization';

type ContentTileProps = Omit<IPostsAndTilsPost, 'description'> & {
  description?: string;
  urlBuilder: (slug: string) => string;
};

export function ContentTile({
  slug,
  publishedAt,
  title,
  description,
  urlBuilder,
  subtitle,
}: ContentTileProps) {
  const { formatDate, formatMessage } = useLocalization();
  const [isFocused, setIsFocused] = useState(false);

  const formattedPublishedAt = formatDate(new Date(publishedAt), {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return (
    <m.article
      className="mb-3"
      onHoverStart={() => setIsFocused(true)}
      onHoverEnd={() => setIsFocused(false)}
    >
      <Link
        href={urlBuilder(slug)}
        className="relative inline-block cursor-pointer"
      >
        <h3
          className={classNames('text-lg font-black md:text-xl', {
            'text-secondary': isFocused,
          })}
        >
          {title}
        </h3>
        {subtitle ? (
          <h4 className="font-medium text-gray-600 dark:text-gray-300 text-md md:text-lg mb-2.5">
            {subtitle}
          </h4>
        ) : null}

        <span className="block text-md lg:text-base font-sans mb-2.5">
          <time dateTime={publishedAt}>{formattedPublishedAt}</time>
        </span>
        {description && (
          <p className="text-base md:text-md text-primary dark:text-gray-200 text-opacity-80 dark:text-opacity-100">
            {description}
          </p>
        )}
        <span
          className={classNames('flex mt-3 font-bold', {
            'font-extrabold text-secondary': isFocused,
          })}
        >
          {formatMessage({ id: 'blog.readMore' })}
          <ArrowRightIcon className="w-4 ml-2" />
        </span>
      </Link>
    </m.article>
  );
}
