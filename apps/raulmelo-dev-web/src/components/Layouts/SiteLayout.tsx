import React, { FC } from 'react';

import { MenuBar } from '@components/MenuBar';
import { Container } from '@components/Ui';
import { styled } from '@styles/styled';

const Main = styled(Container)``;

// TODO: couldn't find something better for any
export const SiteLayout: FC<{ as?: any }> = ({ children, ...props }) => {
  return (
    <>
      <MenuBar />
      <Main {...props}>{children}</Main>
    </>
  );
};
