import { AppContext } from '@contexts/app';
import { useContext } from 'react';

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used under AppContextProvider context');
  }

  return context;
}
