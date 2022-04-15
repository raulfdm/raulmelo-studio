// TODO: fix SideMenu
import React, { createContext } from 'react';

import { UseSideMenu, useSideMenu } from '~/components/SideMenu/useSideMenu';

type AppContextTypes = { sideMenu: UseSideMenu };

export const AppContext = createContext<AppContextTypes | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const sideMenu = useSideMenu();

  return (
    <AppContext.Provider value={{ sideMenu }}>{children}</AppContext.Provider>
  );
};
