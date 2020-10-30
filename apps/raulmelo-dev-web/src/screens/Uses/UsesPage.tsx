import { FC } from 'react';

import { BlogTheme } from '@components/Themes/BlogTheme';

export const UsesPage: FC = ({ children }) => {
  return <BlogTheme>{children}</BlogTheme>;
};
