import React from 'react';
import classNames from 'classnames';

export const ProseContainer = ({
  children,
  className,
  as = 'article',
}: ProseContainerProps) => {
  const Element = as;

  return (
    <Element
      className={classNames([
        'prose dark:prose-dark',
        'prose-lg md:prose-xl lg:prose-2xl',
        'max-w-full',
        className,
      ])}
    >
      {children}
    </Element>
  );
};

export type ProseContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};
