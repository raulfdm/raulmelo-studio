import { ArrowRightIcon } from '@raulmelo/ui';
import classNames from 'classnames';
import { m } from 'framer-motion';
import { useState } from 'react';

export type ContentTileProps = {
  description?: string;
  slug: string;
  publishedAt: string;
  title: string;
  subtitle?: string;
  urlBuilder: (slug: string) => string;
  readMoreLabel: string;
  formatDate: (publishedAt: string) => string;
};

export function ContentTile({
  slug,
  publishedAt,
  title,
  description,
  urlBuilder,
  subtitle,
  readMoreLabel,
  formatDate,
}: ContentTileProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <m.article
      className="mb-3"
      onHoverStart={() => setIsFocused(true)}
      onHoverEnd={() => setIsFocused(false)}
    >
      <a
        href={urlBuilder(slug)}
        className="relative inline-block cursor-pointer"
      >
        <h3
          className={classNames(`text-lg font-black md:text-xl`, {
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
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
        </span>
        {description && (
          <p className="text-base md:text-md text-primary dark:text-gray-200 text-opacity-80 dark:text-opacity-100">
            {description}
          </p>
        )}
        <span
          className={classNames(`flex mt-3 font-bold`, {
            'font-extrabold text-secondary': isFocused,
          })}
        >
          {readMoreLabel}
          <ArrowRightIcon className="w-4 ml-2" />
        </span>
      </a>
    </m.article>
  );
}
