import { type SupportedLanguages } from '@raulmelo/core';
import { CloseIcon, MenuIcon } from '@raulmelo/ui';
import { domAnimation, LazyMotion } from 'framer-motion';

import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
import { getPathnameWithLocale } from '@/infrastructure/utils/url';

import { LanguageSwitch } from './LanguageSwitch';
import { MenuButton } from './MenuBarButton';
import { SideMenu, useSideMenu } from './SideMenu';
import { ThemeSwitch } from './ThemeSwitch';

type MenuBarProps = {
  lang: SupportedLanguages;
  logo?: any;
  pathname: string;
};

export function MenuBar({ lang, logo, pathname }: MenuBarProps) {
  const sideMenu = useSideMenu();
  const intl = getIntl(lang);

  const Icon = sideMenu.isClosed ? MenuIcon : CloseIcon;

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative inset-x-0 z-40 h-16 mb-8 duration-200 bg-white shadow dark:bg-blue-800 transition-theme ease md:mb-12">
        <nav className="items-center h-full grid-container">
          <section data-testid="menu-bar__logo" className="col-span-2">
            <a
              href={getPathnameWithLocale(`/`, lang)}
              className="text-primary"
              aria-label={intl.formatMessage({
                id: `menu.logoAriaLabel`,
              })}
            >
              {logo}
            </a>
          </section>
          <section className="flex justify-end col-span-2 space-x-3 md:col-end-9 lg:col-end-13">
            <ThemeSwitch
              label={intl.formatMessage({
                id: `menu.themeButtonAriaLabel`,
              })}
            />
            <LanguageSwitch
              lang={lang}
              pathname={pathname}
              label={intl.formatMessage({
                id: `menu.languageButtonAriaLabel`,
              })}
            />
            <MenuButton
              onClick={sideMenu.toggle}
              aria-label={intl.formatMessage({
                id: `menu.sideMenuButtonAriaLabel`,
              })}
              data-testid="side-menu-button"
            >
              <Icon className="w-6" />
            </MenuButton>
          </section>
        </nav>
      </div>
      <SideMenu
        lang={lang}
        isClosed={sideMenu.isClosed}
        handleClose={sideMenu.handleClose}
        state={sideMenu.state}
      />
    </LazyMotion>
  );
}
