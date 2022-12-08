import { useApp } from '$infrastructure/contexts/App';
import { useLocalization } from '$infrastructure/contexts/Localization';
import { useAppLocation } from '$infrastructure/hooks/useAppLocation';
import { useClickAway } from '$infrastructure/hooks/useClickAway';
import { getPathnameWithLocale } from '$infrastructure/utils/url';
import { Disclosure } from '@headlessui/react';
import { ExternalLinkIcon } from '@raulmelo/ui';
import { Link, useLocation } from '@remix-run/react';
import classNames from 'classnames';
import { m, useAnimation } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';

export const SideMenu = () => {
  const { sideMenu } = useApp();

  const { state, handleClose } = sideMenu;
  const links = useLinks();
  const navRef = useRef(null);
  const { pathname } = useLocation();

  const { locale } = useLocalization();

  const isClosed = state === `closed`;
  useClickAway(navRef, handleClose, [`mouseevent`, `scroll`]);

  /**
   * The following animation exists because I need to coordinate the animations.
   * If I let translate and display run in the same time, when it got close,
   * because the display will be `none`, it'll suddenly disappear.
   */
  const animation = useAnimation();

  async function sequence() {
    if (isClosed) {
      await animation.start({ transform: `translate3d(100%, 0, 0)` });
      await animation.start({ display: `none` });
    } else {
      await animation.start({ display: `block` });
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
        as={m.nav}
        className={classNames(
          `fixed bottom-0 right-0 z-20 h-full min-w-full duration-200 transform translate-x-full`,
          `bg-white top-16 dark:bg-blue-800 sm:min-w-min sm:w-full sm:max-w-xs transition-theme ease`,
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
                `mx-5 text-xl font-black cursor-pointer sm:text-lg`,
                `side-menu-item`,
              ]),
            };

            const isActive = pathname === getPathnameWithLocale(href, locale);

            return (
              <li className="px-4 py-2 text-center sm:text-left" key={href}>
                {newWindow ? (
                  <>
                    <a
                      {...linkProps}
                      className={classNames([
                        linkProps.className,
                        `relative inline-flex`,
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
                  <Link to={href} {...linkProps} data-active={isActive}>
                    {itemLabel}
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
          `absolute inset-0 top-16 z-10`,
          isClosed ? `pointer-events-none` : `pointer-events-auto`,
        )}
        onClick={handleClose}
        animate={state}
        transition={{ ease: `easeOut`, duration: 0.2 }}
        variants={{
          open: {
            opacity: 0.7,
            display: `block`,
            backgroundColor: `rgba(0,0,0)`,
          },
          closed: {
            opacity: 0,
            display: `none`,
          },
        }}
      />
    </Disclosure>
  );
};

function useLinks() {
  const { formatMessage, locale } = useLocalization();
  const { pathnameWithoutLocale } = useAppLocation();

  return useMemo(
    () =>
      [
        {
          href: `/`,
          localeId: `sideMenu.home`,
        },
        {
          href: `/blog`,
          localeId: `sideMenu.blog`,
        },
        {
          href: `/til`,
          localeId: `sideMenu.til`,
        },
        {
          href: `/search`,
          localeId: `sideMenu.search`,
        },
        {
          href: `/uses`,
          localeId: `sideMenu.uses`,
        },
        {
          href: `/cv`,
          localeId: `sideMenu.cv`,
          noLocale: true,
        },
        {
          href: locale === `en` ? `/rss.xml` : `/rss-pt.xml`,
          localeId: `sideMenu.rss`,
          newWindow: true,
        },
      ].map(({ href, localeId, newWindow = false, noLocale = false }) => {
        return {
          itemLabel: formatMessage({ id: localeId }),
          href: noLocale ? href : getPathnameWithLocale(href, locale),
          newWindow,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale, pathnameWithoutLocale],
  );
}
