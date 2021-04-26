import { useApp } from '@hooks/useApp';
import { useLocalization } from '@hooks/useLocalization';
import { SideMenu as SideMenuComponent } from '@components/SideMenu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { defineMessage } from 'react-intl';

const messages = defineMessage({
  home: {
    id: 'sideMenu.home',
  },
  blog: {
    id: 'sideMenu.blog',
  },
  til: {
    id: 'sideMenu.til',
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

export const SideMenu = () => {
  const { sideMenu } = useApp();
  const { state, handleClose } = sideMenu;
  const { formatMessage, locale } = useLocalization();
  const { pathname } = useRouter();

  const links = useMemo(
    () => [
      {
        href: '/',
        localeId: messages.home,
        locale,
      },
      {
        href: '/blog',
        localeId: messages.blog,
        locale,
      },
      {
        href: '/til',
        localeId: messages.til,
        locale,
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
    ],
    [locale],
  );

  return (
    <SideMenuComponent
      Link={Link}
      state={state}
      className="top-16"
      overlayClassName="top-16"
      handleCloseMenu={handleClose}
      items={links.map(({ href, localeId }) => ({
        itemLabel: formatMessage(localeId),
        active: pathname === href,
        href,
      }))}
    />
  );
};
