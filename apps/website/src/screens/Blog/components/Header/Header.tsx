import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

type HeaderProps = {
  title: string;
  publishDate: string;
  subtitle?: string;
};

export const Header: React.FC<HeaderProps> = React.memo(function Header({
  title,
  subtitle,
  publishDate,
}) {
  return (
    <header className={classNames(['md:px-0'])} data-testid="header">
      <h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif tracking-tight"
        data-testid="header-title"
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className={classNames([
            'text-xl md:text-2xl font-sans text-opacity-50 tracking-tight',
            'mt-2 md:mt-4',
          ])}
          data-testid="header-subtitle"
        >
          {subtitle}
        </p>
      )}

      <p className="my-6 text-right">
        <FormattedMessage
          id="blog.publishedAt"
          values={{
            date: publishDate,
          }}
        />
      </p>
      <hr />
    </header>
  );
});
