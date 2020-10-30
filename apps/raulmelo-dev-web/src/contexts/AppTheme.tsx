import React, { createContext } from 'react';

import { StyledThemeProvider } from '@styles/styled';
import { theme as appTheme } from '@styles/theme';
import { SiteTheme, SupportedThemes } from '@types-app';
import { useThemeHandler } from '@hooks/useThemeHandler';

type ThemeProps = {
  children: React.ReactNode;
  initialTheme?: SupportedThemes;
};

type ContextType = {
  toggleTheme: (opt?: { theme: SupportedThemes }) => void;
  theme: SiteTheme;
  currentTheme: string;
  isDarkTheme: boolean;
};

export const ThemeContext = createContext<Partial<ContextType>>({});

export const AppThemeProvider: React.FC<ThemeProps> = ({
  children,
  initialTheme,
}) => {
  const { currentTheme, toggleTheme } = useThemeHandler(initialTheme);

  const isDarkTheme = currentTheme === 'dark';

  const enhancedTheme = { ...(appTheme as SiteTheme), isDarkTheme };

  return (
    <StyledThemeProvider theme={enhancedTheme}>
      <ThemeContext.Provider
        value={{
          toggleTheme,
          theme: enhancedTheme,
          currentTheme,
          isDarkTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </StyledThemeProvider>
  );
};
