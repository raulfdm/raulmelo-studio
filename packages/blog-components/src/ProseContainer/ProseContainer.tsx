import React from 'react';

export const ProseContainer = ({ children }: ProseContainerProps) => {
  return (
    <article className="prose dark:prose-dark prose-lg lg:prose-xl 2xl:prose-2xl container mx-auto px-4 md:px-0 max-w-screen-md">
      {children}
    </article>
  );
};

export type ProseContainerProps = {
  children: React.ReactNode;
};
