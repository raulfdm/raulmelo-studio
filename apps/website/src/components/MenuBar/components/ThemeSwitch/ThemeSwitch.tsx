import 'twin.macro';

import { MoonIcon, SunIcon } from '~/components/Icons';
import { MenuButton } from '~/components/MenuBar';
import { useThemeHandler } from '~/hooks/useThemeHandler';

const ThemeIconMap = {
  dark: SunIcon,
  light: MoonIcon,
  /**
   * Since the initial state of the machine is "off", I need to
   * fallback to something, otherwise it'll try to render "undefined"
   */
  off: SunIcon,
};

export const ThemeSwitch: React.FC = () => {
  const { toggleTheme, currentTheme } = useThemeHandler();

  const Icon = ThemeIconMap[currentTheme];

  return (
    <MenuButton onClick={toggleTheme} data-testid="theme-switch">
      <Icon tw="w-6" />
    </MenuButton>
  );
};
