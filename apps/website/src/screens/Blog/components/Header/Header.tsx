import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

type HeaderProps = {
  title: string;
  publishedDate: string;
  subtitle?: string;
};

export const Header: React.FC<HeaderProps> = React.memo(function Header({
  title,
  subtitle,
  publishedDate,
}) {
  return (
    <header className={classNames(['border-b'])}>
      <h1
        className={classNames([
          'text-xl sm:text-2xl lg:text-3xl',
          'font-black',
          'tracking-tight',
        ])}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className={classNames([
            'tracking-tight',
            'text-lg sm:text-xl lg:text-2xl',
            'font-medium opacity-80',
            'mt-2',
          ])}
        >
          {subtitle}
        </p>
      )}
      <p
        className={classNames([
          'text-right',
          'text-base lg:text-md',
          'mt-6 mb-4',
        ])}
      >
        <FormattedMessage
          id="blog.publishedDate"
          values={{
            publishedDate,
          }}
        />
      </p>
    </header>
  );
});
