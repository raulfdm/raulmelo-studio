import React from 'react';
import styled from '@emotion/styled';

const Hr = styled.hr`
  && {
    border-color: transparent;
    position: relative;
    overflow: visible;
    text-align: center;

    &::before {
      content: '...';
      letter-spacing: 0.6em;
      position: relative;
      top: -26px;
    }
  }
`;

export const DotDivider = (props: DotDividerProps) => (
  <Hr className="italic text-2xl my-5" {...props} data-testid="dot-divider" />
);

export type DotDividerProps = React.ComponentPropsWithoutRef<'hr'>;
