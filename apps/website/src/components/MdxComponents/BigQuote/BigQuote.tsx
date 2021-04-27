import React from 'react';
import 'twin.macro';

export const BigQuote = ({ ...props }: BigQuoteProps) => (
  <blockquote
    /* 
      According to W3 HTMl aria, blockquote by itself has no role.
      https://www.w3.org/TR/html-aria/
    */
    role="blockquote"
    tw="border-none text-xl md:text-2xl lg:text-4xl font-black tracking-normal"
    {...props}
  />
);

export type BigQuoteProps = React.ComponentPropsWithoutRef<'blockquote'>;
