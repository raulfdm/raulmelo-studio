import { Disclosure } from '@headlessui/react';
import tw, { css, styled } from 'twin.macro';
//TODO: fix @hooks/index
import { useClickAway } from '@hooks/index';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useMemo, useRef } from 'react';
import { useLocalization } from '@hooks/useLocalization';
import { useApp } from '@hooks/useApp';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ExternalLinkIcon } from '@components/Icons';

const styles = {
  sideMenuPanel: tw`fixed bottom-0 right-0 z-20 h-full min-w-full duration-200 transform translate-x-full bg-white top-16 dark:bg-blue-800 sm:min-w-min sm:w-full sm:max-w-xs transition-theme ease`,
  sideMenuItem: (isActive: boolean) => css`
    ${tw`mx-5 text-xl font-black cursor-pointer sm:text-lg`};
    ${isActive &&
    tw`border-b-2 sm:pl-3 sm:border-l-2 sm:border-b-0 border-secondary border-opacity-80 transition-theme`}
  `,
  sideMenuItemExternalLink: tw`relative inline-flex`,
  sideMenuItemExternalIcon: tw`absolute top-0 w-4 -right-6`,
  overlay: (isClosed: boolean) => css`
    ${tw`absolute inset-0 top-16 z-10 opacity-0 background[rgba(0,0,0,0.7)]`};
    pointer-events: ${isClosed ? 'none' : 'all'};
  `,
  list: tw`flex flex-col py-6`,
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
          {links.map(({ href, active, itemLabel, newWindow }) => {
            const linkProps = {
              onClick: handleClose,
              css: styles.sideMenuItem(active),
            };

            return (
              <li css={styles.listItem} key={href}>
                {newWindow ? (
                  <>
                    <a
                      {...linkProps}
                      css={[linkProps.css, styles.sideMenuItemExternalLink]}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {itemLabel}
                      <ExternalLinkIcon css={styles.sideMenuItemExternalIcon} />
                    </a>
                  </>
                ) : (
                  <Link href={href} passHref>
                    <a {...linkProps}>{itemLabel}</a>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </Disclosure.Panel>
      <Disclosure.Panel
        static
        as={motion.div}
        aria-hidden={isClosed}
        css={styles.overlay(isClosed)}
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
          localeId: 'sideMenu.home',
        },
        {
          href: '/blog',
          localeId: 'sideMenu.blog',
        },
        {
          href: '/til',
          localeId: 'sideMenu.til',
        },
        {
          href: '/search',
          localeId: 'sideMenu.search',
        },
        {
          href: '/uses',
          localeId: 'sideMenu.uses',
        },
        {
          href: '/cv',
          localeId: 'sideMenu.cv',
        },
        {
          href: locale === 'en' ? '/rss.xml' : '/rss-pt.xml',
          localeId: 'sideMenu.rss',
          newWindow: true,
        },
      ].map(({ href, localeId, newWindow = false }) => ({
        itemLabel: formatMessage({ id: localeId }),
        active: pathname === href,
        href,
        newWindow,
      })),
    [locale, pathname],
  );
}
