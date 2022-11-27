import { CloseIcon, MenuIcon } from '@raulmelo/ui';
import { useLocalization } from '$infrastructure/contexts/Localization';
import { Logo } from '$ui/Logo';
import { Link } from '@remix-run/react';
import type { ComponentPropsWithRef } from 'react';
import { forwardRef } from 'react';
import { defineMessages } from 'react-intl';
import classNames from 'classnames';
import { useApp } from '$infrastructure/contexts/App';
import { LanguageSwitch } from './components/LanguageSwitch';
import { ThemeSwitch } from './components/ThemeSwitch';
import { SideMenu } from '$ui/SideMenu';

const messages = defineMessages({
  sideMenuButton: {
    id: 'menu.sideMenuButtonAriaLabel',
  },
  logoLink: {
    id: 'menu.logoAriaLabel',
  },
});

export function MenuBar() {
  const { sideMenu } = useApp();
  const { formatMessage } = useLocalization();

  const Icon = sideMenu.isClosed ? MenuIcon : CloseIcon;

  return (
    <>
      <div className="relative inset-x-0 z-40 h-16 mb-8 duration-200 bg-white shadow dark:bg-blue-800 transition-theme ease md:mb-12">
        <nav className="items-center h-full grid-container">
          <section data-testid="menu-bar__logo" className="col-span-2">
            <Link
              to="/"
              className="text-primary"
              aria-label={formatMessage(messages.logoLink)}
            >
              <Logo />
            </Link>
          </section>
          <section className="flex justify-end col-span-2 space-x-3 md:col-end-9 lg:col-end-13">
            <ThemeSwitch />
            <LanguageSwitch />
            <MenuButton
              onClick={sideMenu.toggle}
              aria-label={formatMessage(messages.sideMenuButton)}
              data-testid="side-menu-button"
            >
              <Icon className="w-6" />
            </MenuButton>
          </section>
        </nav>
      </div>
      <SideMenu />
    </>
  );
}

export const MenuButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithRef<'button'>
>(function MenuButton({ className, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={classNames('flex p-2 place-content-center', className)}
      {...props}
    />
  );
});
