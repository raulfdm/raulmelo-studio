import { Disclosure } from '@headlessui/react';
import { ExternalLinkIcon } from '@raulmelo/ui';
import classNames from 'classnames';
import { m, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef } from 'react';

//TODO: fix ~/hooks/index
import { useClickAway } from '~/hooks/index';
import { useApp } from '~/hooks/useApp';
import { useLocalization } from '~/hooks/useLocalization';

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

  useCloseSideMenuOnRouteChange(handleClose);

  return (
    <Disclosure>
      <Disclosure.Panel
        static
        as={m.nav}
        className={classNames(
          'fixed bottom-0 right-0 z-20 h-full min-w-full duration-200 transform translate-x-full',
          'bg-white top-16 dark:bg-blue-800 sm:min-w-min sm:w-full sm:max-w-xs transition-theme ease',
        )}
        aria-expanded={!isClosed}
        ref={navRef}
        animate={animation}
        data-testid="sideMenu"
      >
        <ul className="flex flex-col py-6">
          {links.map(({ href, active, itemLabel, newWindow }) => {
            const linkProps = {
              onClick: handleClose,
              className: classNames([
                'mx-5 text-xl font-black cursor-pointer sm:text-lg',
                active &&
                  'border-b-2 sm:pl-3 sm:border-l-2 sm:border-b-0 border-secondary border-opacity-80 transition-theme',
              ]),
            };

            return (
              <li className="px-4 py-2 text-center sm:text-left" key={href}>
                {newWindow ? (
                  <>
                    <a
                      {...linkProps}
                      className={classNames([
                        linkProps.className,
                        'relative inline-flex',
                      ])}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {itemLabel}
                      <ExternalLinkIcon className="absolute top-0 w-4 -right-6" />
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
        as={m.div}
        aria-hidden={isClosed}
        className={classNames(
          'absolute inset-0 top-16 z-10',
          isClosed ? 'pointer-events-none' : 'pointer-events-auto',
        )}
        onClick={handleClose}
        animate={state}
        transition={{ ease: 'easeOut', duration: 0.2 }}
        variants={{
          open: {
            opacity: 0.7,
            display: 'block',
            backgroundColor: 'rgba(0,0,0)',
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
  const { asPath } = useRouter();

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
        active: asPath === href,
        href,
        newWindow,
      })),
    [locale, asPath],
  );
}

function useCloseSideMenuOnRouteChange(handler: () => void) {
  const { events } = useRouter();

  useEffect(() => {
    events.on('routeChangeComplete', handler);

    return () => {
      events.off('routeChangeComplete', handler);
    };
  }, []);

  return null;
}
