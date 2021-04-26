import React from 'react';
import classNames from 'classnames';

export const BigQuote = ({ className, ...props }: BigQuoteProps) => (
  <blockquote
    /* 
      According to W3 HTMl aria, blockquote by itself has no role.
      https://www.w3.org/TR/html-aria/
    */
    role="blockquote"
    className={classNames([
      'border-none',
      'text-xl md:text-2xl lg:text-4xl',
      'font-black',
      'text-opacity-60',
      'tracking-normal',
      className,
    ])}
    {...props}
  />
);

export type BigQuoteProps = React.ComponentPropsWithoutRef<'blockquote'>;
