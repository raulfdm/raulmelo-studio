import { defineMessage } from 'react-intl';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useLocalization } from '@hooks/useLocalization';
import { useApp } from '@hooks/useApp';
import { Nav, StyledLink, Overlay } from './styles';

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
      <Nav
        isCollapsed={isCollapsed}
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
              <StyledLink
                $isCurrentPage={pathname === href}
                onClick={toggle}
                data-testid={`${localeId.id}-link`}
              >
                {formatMessage(localeId)}
              </StyledLink>
            </Link>
          );
        })}
      </Nav>
      {!isCollapsed ? (
        <Overlay
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
