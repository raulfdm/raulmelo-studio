import React, { createContext, useContext } from 'react';

import { type UseSideMenu, useSideMenu } from '@/ui/SideMenu';

type AppContextTypes = { sideMenu: UseSideMenu };

export const AppContext = createContext<AppContextTypes | undefined>(undefined);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const sideMenu = useSideMenu();

  return (
    <AppContext.Provider value={{ sideMenu }}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      `useAppContext must be used under AppContextProvider context`,
    );
  }

  return context;
}
