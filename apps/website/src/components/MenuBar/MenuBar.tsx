import Link from 'next/link';
import { FC } from 'react';
import { m } from 'framer-motion';
import { Logo } from '@raulfdm/blog-components';

import { SideMenuNavIcon, SideMenu } from '@components/SideMenu';
import { ThemeSwitch } from './components/ThemeSwitch';
import { LanguageSwitch } from './components/LanguageSwitch';
import classNames from 'classnames';
import { useHideMenu } from './useHideMenu';

export const MenuBar: FC = () => {
  const menuState = useHideMenu();

  const variants = {
    open: { y: 0 },
    closed: { y: '-100%' },
  };

  return (
    <>
      <m.section
        className={classNames([
          'fixed',
          'inset-x-0',
          'top-0 h-16',
          'z-20',
          'shadow',
          'bg-white dark:bg-blue-800',
          'transition-theme duration-200 ease',
        ])}
        // animate={current.value}
        animate={menuState}
        variants={variants}
        transition={{ duration: 0.3, type: 'tween' }}
        data-testid="menu-bar"
      >
        <div className="flex items-center max-w-7xl mx-auto h-full px-4">
          <div className="flex-1" data-testid="menu-bar__logo">
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </div>
          <div className="flex space-x-3">
            <ThemeSwitch />
            <LanguageSwitch />
            <SideMenuNavIcon />
          </div>
        </div>
      </m.section>
      <SideMenu />
      <style global jsx>{`
        #__next {
          padding-top: calc(64px + 24px);
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
