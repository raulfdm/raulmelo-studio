import React, { createContext } from 'react';
// TODO: fix SideMenu
import { useSideMenu, UseSideMenu } from '@components/SideMenu/useSideMenu';

type AppContextTypes = { sideMenu: UseSideMenu };

export const AppContext = createContext<AppContextTypes | undefined>(undefined);

export const AppContextProvider: React.FC = ({ children }) => {
  const sideMenu = useSideMenu();

  return (
    <AppContext.Provider value={{ sideMenu }}>{children}</AppContext.Provider>
  );
};
