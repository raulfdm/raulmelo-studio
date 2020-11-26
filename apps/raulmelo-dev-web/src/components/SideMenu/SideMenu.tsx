import { defineMessage } from 'react-intl';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import { useLocalization } from '@hooks/useLocalization';
import { useApp } from '@hooks/useApp';
import { MenuButton } from '@components/MenuBar';
import { Menu, Close } from '@icons';

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

  const { isCollapsed, toggle, hide } = sideMenu;
  const animate = isCollapsed ? 'closed' : 'open';

  useEffect(() => {
    const hideOnScroll = (): void => {
      if (!isCollapsed) {
        hide();
      }
    };

    document.addEventListener('scroll', hideOnScroll);
    return () => {
      document.removeEventListener('scroll', hideOnScroll);
    };
  }, [isCollapsed, hide]);

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
        animate={animate}
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
          return (
            <Link key={localeId.id} href={href}>
              <a
                className={classNames([
                  'cursor-pointer',
                  'font-serif text-lg font-bold',
                  'mx-5',
                  pathname === href &&
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
      {!isCollapsed ? (
        <motion.div
          className={classNames([
            'absolute',
            'inset-0',
            'z-10',
            'bg-black bg-opacity-80',
          ])}
          style={{
            pointerEvents: isCollapsed ? 'none' : 'all',
          }}
          onClick={hide}
          animate={animate}
          variants={{
            open: {
              opacity: 1,
            },
            closed: {
              opacity: 0,
            },
          }}
        />
      ) : null}
    </>
  );
};

export const SideMenuNavIcon = () => {
  const { sideMenu } = useApp();

  const Icon = sideMenu.isCollapsed ? Menu : Close;
  return (
    <MenuButton onClick={sideMenu.toggle} data-testid="side-menu-button">
      <Icon width={21} />
    </MenuButton>
  );
};
