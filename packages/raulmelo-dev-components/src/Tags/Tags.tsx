import React from 'react';
import classNames from 'classnames';

export const Tags = ({ className, ...props }: TagsProps) => {
  return (
    <ul
      className={classNames([
        'flex flex-row space-x-2 md:space-x-4 mt-2 md:mt-4',
        'flex-wrap',
        className,
      ])}
      {...props}
    />
  );
};

export type TagsProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;
