import { MoonIcon, SunIcon } from '@raulmelo/ui';
import { useEffect, useState } from 'react';
import { MenuButton } from '../MenuBarButton';

type ThemeSwitchProps = {
  label: string;
};

type Theme = 'dark' | 'light';
export function ThemeSwitch({ label }: ThemeSwitchProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem('theme') as Theme) ?? 'light',
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const Icon = theme === 'light' ? MoonIcon : SunIcon;

  return (
    <MenuButton
      onClick={handleClick}
      data-testid="theme-switch"
      aria-label={label}
    >
      <Icon className="w-6" />
    </MenuButton>
  );

  function handleClick() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }
}
