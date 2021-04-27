import { Disclosure } from '@headlessui/react';
import tw, { css } from 'twin.macro';
//TODO: fix @hooks/index
import { useClickAway } from '@hooks/index';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useMemo, useRef } from 'react';
import { SideMenuItem } from '../SideMenuItem';
import { useLocalization } from '@hooks/useLocalization';
import { useApp } from '@hooks/useApp';
import { useRouter } from 'next/router';
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
  const navRef = useRef(null);
  const links = useMemo(
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
    [locale],
  );

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
        as={motion.nav}
        aria-expanded={!isClosed}
        ref={navRef}
        css={[
          tw`fixed`,
          tw`bottom-0 right-0 top-16`,
          tw`h-full`,
          tw`bg-white dark:bg-blue-800`,
          tw`z-20`,
          tw`transform translate-x-full`,
          tw`min-w-full sm:min-w-min sm:w-full sm:max-w-xs`,
          tw`transition-theme duration-200 ease`,
        ]}
        animate={animation}
        data-testid="sideMenu"
      >
        <ul tw="py-6 flex flex-col">
          {links.map((props) => (
            <SideMenuItem key={props.href} {...props} onClick={handleClose} />
          ))}
        </ul>
      </Disclosure.Panel>
      <Disclosure.Panel
        static
        as={motion.div}
        aria-hidden={isClosed}
        css={[
          tw`absolute inset-0 top-16 z-10 opacity-0 background[rgba(0,0,0,0.7)]`,
          css`
            pointer-events: ${isClosed ? 'none' : 'all'};
          `,
        ]}
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
