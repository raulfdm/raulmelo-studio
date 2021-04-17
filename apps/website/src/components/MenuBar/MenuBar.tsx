import { SideMenu } from '@components/SideMenu';
import { useApp } from '@hooks/useApp';
import { CloseIcon, Logo, MenuIcon } from '@raulfdm/blog-components';
import classNames from 'classnames';
import Link from 'next/link';
import { FC } from 'react';
import { LanguageSwitch } from './components/LanguageSwitch';
import { ThemeSwitch } from './components/ThemeSwitch';

export const MenuBar: FC = () => {
  const { sideMenu } = useApp();

  const Icon = sideMenu.isClosed ? MenuIcon : CloseIcon;

  return (
    <>
      <section
        className={classNames([
          'inset-x-0',
          'h-16',
          'z-40',
          'shadow',
          'bg-white dark:bg-blue-800',
          'transition-theme duration-200 ease',
          'mb-8 md:mb-12 lg:mb-18',
          !sideMenu.isClosed && 'sticky',
        ])}
      >
        <div className={classNames(['items-center h-full', 'grid-container'])}>
          <div data-testid="menu-bar__logo" className="col-span-2">
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </div>
          <div className="flex justify-end space-x-3 col-span-2 md:col-end-9 lg:col-end-13">
            <ThemeSwitch />
            <LanguageSwitch />
            <button
              className={menuButtonClasses}
              onClick={sideMenu.toggle}
              data-testid="side-menu-button"
            >
              <Icon className="w-6" />
            </button>
          </div>
        </div>
      </section>
      <SideMenu />
    </>
  );
};

export const menuButtonClasses = 'p-2 flex place-content-center';
