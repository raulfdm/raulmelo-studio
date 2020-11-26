import React from 'react';

export const BlogUiContainer: React.FC = ({ children }) => {
  return (
    <article className="prose dark:prose-dark prose-lg lg:prose-xl container mx-auto px-4 md:px-0 max-w-screen-md">
      {children}
    </article>
  );
};
