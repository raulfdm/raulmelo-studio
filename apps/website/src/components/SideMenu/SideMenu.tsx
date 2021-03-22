import { defineMessage } from 'react-intl';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { MenuIcon, CloseIcon } from '@raulfdm/blog-components';

import { useLocalization } from '@hooks/useLocalization';
import { useApp } from '@hooks/useApp';
import { MenuButton } from '@components/MenuBar';

const messages = defineMessage({
  home: {
    id: 'sideMenu.home',
  },
  search: {
    id: 'sideMenu.search',
  },
  uses: {
    id: 'sideMenu.uses',
  },
  cv: {
    id: 'sideMenu.cv',
  },
});

const links = [
  {
    href: '/',
    localeId: messages.home,
  },
  {
    href: '/search',
    localeId: messages.search,
  },
  {
    href: '/uses',
    localeId: messages.uses,
  },
  {
    href: '/cv',
    localeId: messages.cv,
  },
];

export const SideMenu = () => {
  const { sideMenu } = useApp();
  const { formatMessage } = useLocalization();
  const { pathname } = useRouter();

  const { currentState, isClosed, toggle, hide } = sideMenu;

  useEffect(() => {
    document.addEventListener('scroll', hide);
    return () => {
      document.removeEventListener('scroll', hide);
    };
  }, [hide]);

  return (
    <>
      <motion.nav
        className={classNames([
          'fixed',
          'bottom-0 top-16 right-0',
          'h-full',
          'bg-white dark:bg-blue-800',
          'z-20',
          'transform translate-x-full',
          'flex flex-col',
          'w-32 sm:w-64',
          'min-w-1/2 sm:min-w-max',
          'py-2',
          'space-y-3',
          'transition-theme duration-200 ease',
        ])}
        animate={currentState}
        variants={{
          open: {
            transform: `translate3d(0%, 0, 0)`,
          },
          closed: {
            transform: `translate3d(100%, 0, 0)`,
          },
        }}
        data-testid="sideMenu"
      >
        {links.map(({ href, localeId }) => {
          const sanitizedPath = pathname.replace('blog', '');

          return (
            <Link key={localeId.id} href={href}>
              <a
                className={classNames([
                  'cursor-pointer',
                  'font-serif text-lg font-bold',
                  'mx-5',
                  sanitizedPath === href &&
                    'pl-3 border-l-2 border-gray-800 dark:border-gray-300',
                ])}
                onClick={toggle}
                data-testid={`${localeId.id}-link`}
              >
                {formatMessage(localeId)}
              </a>
            </Link>
          );
        })}
      </motion.nav>
      <motion.div
        className={classNames([
          'absolute',
          'inset-0',
          'z-10',
          'bg-black bg-opacity-80',
          'opacity-0',
        ])}
        style={{
          pointerEvents: isClosed ? 'none' : 'all',
        }}
        onClick={hide}
        animate={currentState}
        transition={{ ease: 'easeOut', duration: 0.2 }}
        variants={{
          open: {
            opacity: 1,
          },
          closed: {
            opacity: 0,
          },
        }}
      />
    </>
  );
};

export const SideMenuNavIcon = () => {
  const { sideMenu } = useApp();

  const Icon = sideMenu.isClosed ? MenuIcon : CloseIcon;
  return (
    <MenuButton onClick={sideMenu.toggle} data-testid="side-menu-button">
      <Icon width={21} />
    </MenuButton>
  );
};
