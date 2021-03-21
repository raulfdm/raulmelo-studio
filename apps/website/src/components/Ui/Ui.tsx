import React, { ReactHTML } from 'react';
import { m } from 'framer-motion';

type Props = {
  as?: keyof ReactHTML;
};

export const Container: React.FC<Props> = (
  { as, ...props } = { as: 'div' },
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const Component = m[as];
  return (
    <Component
      className="container mx-auto px-4 md:px-0 max-w-screen-md"
      {...props}
    />
  );
};
