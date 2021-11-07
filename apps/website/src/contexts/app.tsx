// TODO: fix SideMenu
import { UseSideMenu, useSideMenu } from '@components/SideMenu/useSideMenu';
import React, { createContext } from 'react';

type AppContextTypes = { sideMenu: UseSideMenu };

export const AppContext = createContext<AppContextTypes | undefined>(undefined);

export const AppContextProvider: React.FC = ({ children }) => {
  const sideMenu = useSideMenu();

  return (
    <AppContext.Provider value={{ sideMenu }}>{children}</AppContext.Provider>
  );
};
