import { MenuButton } from '@components/MenuBar';
import { useThemeHandler } from '@hooks/useThemeHandler';
import { Moon, Sun } from '@icons';

export const ThemeSwitch: React.FC = () => {
  const { toggleTheme, currentTheme } = useThemeHandler();

  const Icon = currentTheme === 'dark' ? Moon : Sun;

  return (
    <MenuButton onClick={() => toggleTheme!()} data-testid="theme-switch">
      <Icon className="w-5" />
    </MenuButton>
  );
};
