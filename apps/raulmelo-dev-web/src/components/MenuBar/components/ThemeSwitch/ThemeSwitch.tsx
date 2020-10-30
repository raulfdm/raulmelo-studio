import { Sun } from '@styled-icons/boxicons-solid/Sun';
import { Moon } from '@styled-icons/boxicons-solid/Moon';

import { MenuButton } from '@components/MenuBar';
import { useThemeHandler } from '@hooks/useThemeHandler';

export const ThemeSwitch: React.FC = () => {
  const { toggleTheme, currentTheme } = useThemeHandler();

  const Icon = currentTheme === 'dark' ? Moon : Sun;

  return (
    <MenuButton onClick={() => toggleTheme!()} data-testid="theme-switch">
      <Icon size={21} />
    </MenuButton>
  );
};
