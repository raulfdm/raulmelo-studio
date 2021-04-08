import { useApp } from '@hooks/useApp';
import { useLocalization } from '@hooks/useLocalization';
import { SideMenu as SideMenuComponent } from '@raulfdm/blog-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { defineMessage } from 'react-intl';

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
  const { state, handleClose } = sideMenu;
  const { formatMessage } = useLocalization();
  const { pathname } = useRouter();

  const sanitizedPath = pathname.replace('blog', '');

  return (
    <SideMenuComponent
      Link={Link}
      state={state}
      className="top-16"
      overlayClassName="top-16"
      handleCloseMenu={handleClose}
      items={links.map(({ href, localeId }) => ({
        itemLabel: formatMessage(localeId),
        active: sanitizedPath === href,
        href,
      }))}
    />
  );
};
