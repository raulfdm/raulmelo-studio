import { SideMenu } from '@components/SideMenu';
import { sharedClasses } from '@components/uiClasses';
import { useApp } from '@hooks/useApp';
import { CloseIcon, Logo, MenuIcon } from '@raulfdm/blog-components';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FC } from 'react';
import { LanguageSwitch } from './components/LanguageSwitch';
import { ThemeSwitch } from './components/ThemeSwitch';
import { useHideMenu } from './useHideMenu';

export const MenuBar: FC = () => {
  const menuState = useHideMenu();
  const { sideMenu } = useApp();

  const Icon = sideMenu.isClosed ? MenuIcon : CloseIcon;

  const variants = {
    open: { y: 0 },
    closed: { y: '-100%' },
  };

  return (
    <>
      <motion.section
        className={classNames([
          'fixed',
          'inset-x-0',
          'top-0 h-16',
          'z-40',
          'shadow',
          'bg-white dark:bg-blue-800',
          'transition-theme duration-200 ease',
        ])}
        animate={menuState}
        variants={variants}
        transition={{ duration: 0.3, type: 'tween' }}
        data-testid="menu-bar"
      >
        <div
          className={classNames([
            'flex items-center h-full',
            sharedClasses.container,
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
              <Icon className="w-6" />
            </MenuButton>
          </div>
        </div>
      </motion.section>
      <SideMenu />
      <style global jsx>{`
        #__next {
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
