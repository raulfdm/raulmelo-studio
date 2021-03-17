import React, { createContext } from 'react';

import { useSideMenu } from '@hooks/useSideMenu';

type AppContextTypes = { sideMenu: ReturnType<typeof useSideMenu> };

export const AppContext = createContext<AppContextTypes | undefined>(undefined);

export const AppContextProvider: React.FC = ({ children }) => {
  const sideMenu = useSideMenu();

  return (
    <AppContext.Provider value={{ sideMenu }}>{children}</AppContext.Provider>
  );
};
