import React, { FC } from 'react';

import { AppThemeProvider } from '@contexts/AppTheme';
import { GlobalStyles } from '@styles/index';
import { SiteLayout } from '@components/Layouts';

export const RegularSiteTheme: FC = ({ children }) => {
  return (
    <AppThemeProvider>
      <GlobalStyles />
      <SiteLayout>{children}</SiteLayout>
    </AppThemeProvider>
  );
};
