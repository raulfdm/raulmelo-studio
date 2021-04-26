import React from 'react';
import classNames from 'classnames';

import styled from '@emotion/styled';

const TagsUl = styled.ul`
  > * {
    margin-right: 1rem;
  }
`;

export const Tags = ({ className, ...props }: TagsProps) => {
  return (
    <TagsUl
      className={classNames([
        'flex flex-row',
        'flex-wrap',
        'text-base',
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
