import React, { FC } from 'react';

import { MenuBar } from '@components/MenuBar';
import { Container } from '@components/Ui';
import { styled, media } from '@styles/styled';
import { SiteTheme } from '@types-app';

const Main = styled(Container)`
  && {
    padding-top: ${({ theme }) => `calc(35px + ${theme.sizes.menuBar.height})`};

    ${media.greaterThan('medium')`
      padding-top: ${({ theme }: { theme: SiteTheme }) =>
        `calc(35px + ${theme.sizes.menuBar.height})`};
    `}
  }
`;

// TODO: couldn't find something better for any
export const SiteLayout: FC<{ as?: any }> = ({ children, ...props }) => {
  return (
    <>
      <MenuBar />
      <Main {...props}>{children}</Main>
    </>
  );
};
