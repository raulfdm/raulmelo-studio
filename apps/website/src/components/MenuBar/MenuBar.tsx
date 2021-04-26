import { CloseIcon, MenuIcon } from '@components/Icons';
import { Logo } from '@components/Logo';
import { SideMenu } from '@components/SideMenu';
import { useApp } from '@hooks/useApp';
import { useLocalization } from '@hooks/useLocalization';
import classNames from 'classnames';
import Link from 'next/link';
import { FC } from 'react';
import { LanguageSwitch } from './components/LanguageSwitch';
import { ThemeSwitch } from './components/ThemeSwitch';

export const MenuBar: FC = () => {
  const { sideMenu } = useApp();
  const { locale } = useLocalization();

  const Icon = sideMenu.isClosed ? MenuIcon : CloseIcon;

  return (
    <>
      <div
        className={classNames([
          'inset-x-0',
          'h-16',
          'z-40',
          'shadow',
          'bg-white dark:bg-blue-800',
          'transition-theme duration-200 ease',
          'mb-8 md:mb-12',
          !sideMenu.isClosed && 'sticky',
        ])}
      >
        <nav className={classNames(['items-center h-full', 'grid-container'])}>
          <section data-testid="menu-bar__logo" className="col-span-2">
            <Link href="/" locale={locale}>
              <a>
                <Logo />
              </a>
            </Link>
          </section>
          <section className="flex justify-end space-x-3 col-span-2 md:col-end-9 lg:col-end-13">
            <ThemeSwitch />
            <LanguageSwitch />
            <button
              className={menuButtonClasses}
              onClick={sideMenu.toggle}
              data-testid="side-menu-button"
            >
              <Icon className="w-6" />
            </button>
          </section>
        </nav>
      </div>
      <SideMenu />
    </>
  );
};

export const menuButtonClasses = 'p-2 flex place-content-center';
