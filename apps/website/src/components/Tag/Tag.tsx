import React from 'react';
import classNames from 'classnames';

export const Tag = ({ className, ...props }: TagProps) => {
  return (
    <li
      className={classNames([
        'font-sans text-center hover:font-bold',
        'cursor-default',
        'list-none',
        className,
      ])}
      {...props}
    />
  );
};

export type TagProps = React.LiHTMLAttributes<HTMLLIElement>;
