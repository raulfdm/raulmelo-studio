import { MoonIcon, SunIcon } from '@raulmelo/ui';
import { defineMessage } from 'react-intl';

import { MenuButton } from '~/components/MenuBar';
import { useLocalization } from '~/hooks/useLocalization';
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

const themeSwitchMessage = defineMessage({
  id: 'menu.themeButtonAriaLabel',
});

export const ThemeSwitch = () => {
  const { toggleTheme, currentTheme } = useThemeHandler();
  const { formatMessage } = useLocalization();

  const Icon = ThemeIconMap[currentTheme];

  return (
    <MenuButton
      onClick={toggleTheme}
      data-testid="theme-switch"
      aria-label={formatMessage(themeSwitchMessage)}
    >
      <Icon className="w-6" />
    </MenuButton>
  );
};
