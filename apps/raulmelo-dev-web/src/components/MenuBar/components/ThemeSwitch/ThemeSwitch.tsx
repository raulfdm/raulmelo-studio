import { MenuButton } from '@components/MenuBar';
import { useThemeHandler } from '@hooks/useThemeHandler';
import { MoonIcon, SunIcon } from '@raulfdm/blog-components';

export const ThemeSwitch: React.FC = () => {
  const { toggleTheme, currentTheme } = useThemeHandler();

  const Icon = currentTheme === 'dark' ? SunIcon : MoonIcon;

  return (
    <MenuButton onClick={() => toggleTheme!()} data-testid="theme-switch">
      <Icon className="w-5" />
    </MenuButton>
  );
};
