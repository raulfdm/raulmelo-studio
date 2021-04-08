import React from 'react';
import classNames from 'classnames';
import styled from '@emotion/styled';

const Prose = styled.article``;

export const ProseContainer = ({
  children,
  className,
  as,
}: ProseContainerProps) => {
  return (
    <Prose
      as={as}
      className={classNames([
        'prose dark:prose-dark',
        'prose-lg md:prose-xl lg:prose-2xl',
        'max-w-full',
        className,
      ])}
    >
      {children}
    </Prose>
  );
};

export type ProseContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: Parameters<typeof Prose>[0]['as'];
};
