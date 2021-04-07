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
          // 'text-3xl md:text-4xl lg:text-5xl',
          'text-xl sm:text-2xl lg:text-3xl',
          'font-black',
          'tracking-tighter',
        ])}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className={classNames([
            'text-xl md:text-2xl font-sans text-opacity-50 tracking-tight',
            'mt-2 md:mt-4',
          ])}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
});
