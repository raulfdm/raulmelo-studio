import { Disclosure } from '@headlessui/react';
import tw, { css, styled } from 'twin.macro';
//TODO: fix @hooks/index
import { useClickAway } from '@hooks/index';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useMemo, useRef } from 'react';
import { useLocalization } from '@hooks/useLocalization';
import { useApp } from '@hooks/useApp';
import { useRouter } from 'next/router';
import { defineMessage } from 'react-intl';
import Link from 'next/link';

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

const styles = {
  sideMenuPanel: tw`
    fixed
    bottom-0 right-0 top-16
    h-full
    bg-white dark:bg-blue-800
    z-20
    transform translate-x-full
    min-w-full sm:min-w-min sm:w-full sm:max-w-xs
    transition-theme duration-200 ease
  `,
  sideMenuItem: (isActive: boolean) => css`
    ${tw`cursor-pointer font-black text-xl sm:text-lg mx-5`};
    ${isActive &&
    tw`
      sm:pl-3
      border-b-2 sm:border-l-2 sm:border-b-0
      border-black dark:border-gray-300 border-opacity-80
  `}
  `,
  overlay: (isClosed: boolean) => css`
    ${tw`absolute inset-0 top-16 z-10 opacity-0 background[rgba(0,0,0,0.7)]`};
    pointer-events: ${isClosed ? 'none' : 'all'};
  `,
  list: tw`py-6 flex flex-col`,
  listItem: tw`px-4 py-2 text-center sm:text-left`,
};

const Panel = styled(motion.nav)`
  ${styles.sideMenuPanel}
`;

export const SideMenu = () => {
  const { sideMenu } = useApp();
  const { state, handleClose } = sideMenu;
  const links = useLinks();
  const navRef = useRef(null);

  const isClosed = state === 'closed';
  useClickAway(navRef, handleClose, ['mouseevent', 'scroll']);

  /**
   * The following animation exists because I need to coordinate the animations.
   * If I let translate and display run in the same time, when it got close,
   * because the display will be `none`, it'll suddenly disappear.
   */
  const animation = useAnimation();

  async function sequence() {
    if (isClosed) {
      await animation.start({ transform: `translate3d(100%, 0, 0)` });
      await animation.start({ display: 'none' });
    } else {
      await animation.start({ display: 'block' });
      await animation.start({ transform: `translate3d(0%, 0, 0)` });
    }
  }

  useEffect(() => {
    sequence();
  }, [isClosed]);

  return (
    <Disclosure>
      <Disclosure.Panel
        static
        as={Panel}
        aria-expanded={!isClosed}
        ref={navRef}
        animate={animation}
        data-testid="sideMenu"
      >
        <ul css={styles.list}>
          {links.map(({ href, active, itemLabel }) => (
            <li css={styles.listItem} key={href}>
              <Link href={href} passHref>
                <a onClick={handleClose} css={styles.sideMenuItem(active)}>
                  {itemLabel}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Disclosure.Panel>
      <Disclosure.Panel
        static
        as={motion.div}
        aria-hidden={isClosed}
        css={styles.overlay}
        onClick={handleClose}
        animate={state}
        transition={{ ease: 'easeOut', duration: 0.2 }}
        variants={{
          open: {
            opacity: 1,
            display: 'block',
          },
          closed: {
            opacity: 0,
            display: 'none',
          },
        }}
      />
    </Disclosure>
  );
};

function useLinks() {
  const { formatMessage, locale } = useLocalization();
  const { pathname } = useRouter();

  return useMemo(
    () =>
      [
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
      ].map(({ href, localeId }) => ({
        itemLabel: formatMessage(localeId),
        active: pathname === href,
        href,
      })),
    [locale, pathname],
  );
}
