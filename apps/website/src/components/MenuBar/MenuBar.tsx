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
          'fixed',
          'inset-x-0',
          'top-0 h-16',
          'z-40',
          'shadow',
          'bg-white dark:bg-blue-800',
          'transition-theme duration-200 ease',
        ])}
        data-testid="menu-bar"
      >
        <section
          className={classNames([
            'flex items-center',
            'max-w-screen-xl',
            'mx-auto',
            'px-4 lg:px-8',
            'h-full',
            'px-4',
          ])}
        >
          <div data-testid="menu-bar__logo">
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </div>
          <div className="flex flex-1 justify-end space-x-3">
            <ThemeSwitch />
            <LanguageSwitch />
            <MenuButton
              onClick={sideMenu.toggle}
              data-testid="side-menu-button"
            >
              <Icon width={21} />
            </MenuButton>
          </div>
        </section>
      </section>
      <SideMenu />
      <style global jsx>{`
        #__next {
          /* Menu Height */
          padding-top: 64px;
          padding-bottom: 5rem;
        }
      `}</style>
    </>
  );
};

export const MenuButton = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      className={classNames(['p-2 flex place-content-center', className])}
      {...props}
    />
  );
};
