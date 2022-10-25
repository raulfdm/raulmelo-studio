import { CloseIcon, MenuIcon } from '@raulmelo/ui';
import classNames from 'classnames';
import Link from 'next/link';
import { ComponentPropsWithRef, FC, forwardRef } from 'react';

import { Logo } from '~/components/Logo';
import { SideMenu } from '~/components/SideMenu';
import { useApp } from '~/hooks/useApp';
import { useLocalization } from '~/hooks/useLocalization';

import { LanguageSwitch } from './components/LanguageSwitch';
import { ThemeSwitch } from './components/ThemeSwitch';

export const MenuBar: FC = () => {
  const { sideMenu } = useApp();
  const { locale } = useLocalization();

  const Icon = sideMenu.isClosed ? MenuIcon : CloseIcon;

  return (
    <>
      <div className="relative inset-x-0 z-40 h-16 mb-8 duration-200 bg-white shadow dark:bg-blue-800 transition-theme ease md:mb-12">
        <nav className="items-center h-full grid-container">
          <section data-testid="menu-bar__logo" className="col-span-2">
            <Link href="/" locale={locale} className="text-primary">
              <Logo />
            </Link>
          </section>
          <section className="flex justify-end col-span-2 space-x-3 md:col-end-9 lg:col-end-13">
            <ThemeSwitch />
            <LanguageSwitch />
            <MenuButton
              onClick={sideMenu.toggle}
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
};

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
