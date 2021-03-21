import React from 'react';
import classNames from 'classnames';

type HeaderProps = {
  title: string;
  subtitle?: string;
  hasBottomMargin: boolean;
};

export const Header: React.FC<HeaderProps> = React.memo(function Header({
  title,
  subtitle,
  hasBottomMargin,
}) {
  return (
    <header
      className={classNames([
        'container mx-auto max-w-screen-md px-4 md:px-0',
        hasBottomMargin && 'mb-8 md:mb-10',
      ])}
      data-testid="header"
    >
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
    </header>
  );
});
