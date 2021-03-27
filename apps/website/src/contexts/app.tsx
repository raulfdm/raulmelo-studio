import React, { createContext } from 'react';
import { useSideMenu, UseSideMenu } from '@raulfdm/blog-components';

type AppContextTypes = { sideMenu: UseSideMenu };

export const AppContext = createContext<AppContextTypes | undefined>(undefined);

export const AppContextProvider: React.FC = ({ children }) => {
  const sideMenu = useSideMenu();

  return (
    <AppContext.Provider value={{ sideMenu }}>{children}</AppContext.Provider>
  );
};
