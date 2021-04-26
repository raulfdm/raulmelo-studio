import styled from '@emotion/styled';
import { css } from '@emotion/react';

const common = css`
  && {
    position: relative;
    @apply relative;
    display: table;
    --icon-visible: hidden;

    &:hover {
      --icon-visible: unset;
    }
  }
`;

export const H1 = styled.h1`
  ${common};
`;

export const H2 = styled.h2`
  ${common};
`;

export const H3 = styled.h3`
  ${common};
`;

export const H4 = styled.h4`
  ${common};
`;

export const H5 = styled.h5`
  ${common};
`;

export const H6 = styled.h6`
  ${common};
`;
