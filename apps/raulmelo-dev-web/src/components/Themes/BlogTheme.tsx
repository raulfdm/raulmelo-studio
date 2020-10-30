import React from 'react';

import { AppThemeProvider } from '@contexts/AppTheme';
import { blogGlobalStyles } from '@screens/Blog/styles/globals';
import { GlobalStyles } from '@styles/index';
import { SiteLayout } from '@components/Layouts';

export const BlogTheme: React.FC = ({ children }) => {
  return (
    <AppThemeProvider>
      <GlobalStyles global={blogGlobalStyles} />
      <SiteLayout as="main">{children}</SiteLayout>
    </AppThemeProvider>
  );
};
