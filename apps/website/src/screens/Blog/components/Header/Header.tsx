import React from 'react';
import classNames from 'classnames';

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export const Header: React.FC<HeaderProps> = React.memo(function Header({
  title,
  subtitle,
}) {
  return (
    <header>
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
            'font-bold opacity-80',
            'mt-4',
          ])}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
});
