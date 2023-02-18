import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
import { getPathnameWithLocale } from '@/infrastructure/utils/url';
import type { SupportedLanguages } from '@raulmelo/core';
import { ExternalLinkIcon } from '@raulmelo/ui';
import classNames from 'classnames';
import { Disclosure } from '@headlessui/react';
import { m, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

type SideMenuProps = {
  lang: SupportedLanguages;
  isClosed: boolean;
  handleClose: () => void;
  state: 'open' | 'closed';
};

export function SideMenu({
  lang,
  isClosed,
  handleClose,
  state,
}: SideMenuProps) {
  const links = useLinks(lang);

  const intl = getIntl(lang);

  const animation = useAnimation();

  const navRef = useRef(null);

  useEffect(() => {
    sequence();
  }, [isClosed]);

  console.log(isClosed);

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
          {links.map(({ href, itemLabel, newWindow }) => {
            const newWindowProps = newWindow
              ? {
                  target: `_blank`,
                  rel: `noreferrer`,
                  className: 'relative inline-flex',
                }
              : {};

            return (
              <li className="px-4 py-2 text-center sm:text-left" key={href}>
                <a
                  href={href}
                  {...newWindowProps}
                  className={classNames([
                    `mx-5 text-xl font-black cursor-pointer sm:text-lg`,
                    `side-menu-item`,
                    newWindowProps.className,
                  ])}
                >
                  {intl.formatMessage({
                    id: itemLabel,
                  })}
                  {newWindow ? (
                    <ExternalLinkIcon className="absolute top-0 w-4 -right-6" />
                  ) : null}
                </a>
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

  async function sequence() {
    if (isClosed) {
      await animation.start({ transform: `translate3d(100%, 0, 0)` });
      await animation.start({ display: `none` });
    } else {
      await animation.start({ display: `block` });
      await animation.start({ transform: `translate3d(0%, 0, 0)` });
    }
  }
}

function useLinks(lang: SupportedLanguages) {
  return [
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
      href: lang === `en` ? `/rss.xml` : `/rss-pt.xml`,
      localeId: `sideMenu.rss`,
      newWindow: true,
    },
  ].map(({ href, localeId, newWindow = false, noLocale = false }) => {
    return {
      itemLabel: localeId,
      href: noLocale ? href : getPathnameWithLocale(href, lang),
      newWindow,
    };
  });
}
