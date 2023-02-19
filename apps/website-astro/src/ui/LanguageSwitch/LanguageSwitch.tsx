import { getPathnameWithoutLocale } from '@/infrastructure/utils/url';
import { Popover } from '@headlessui/react';
import type { SupportedLanguages } from '@raulmelo/core';
import { GlobeIcon } from '@raulmelo/ui';
import { useState } from 'react';
import { usePopper } from 'react-popper';
import { MenuButton } from '../MenuBarButton';

type LanguageSwitchProps = {
  pathname: string;
  label: string;
  lang: SupportedLanguages;
};

export function LanguageSwitch({ pathname, label, lang }: LanguageSwitchProps) {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: 'bottom-end',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 12],
          },
        },
        { name: 'arrow', options: { element: arrowElement, padding: 5 } },
      ],
    },
  );

  /**
   * Having this option in a post Page leads into an undesired behaviour.
   *
   * Not all posts has translations. It means that if the user try to switch
   * locale in a post which does not its equivalent in the selected language,
   * it'll throw redirects the user to a 404 page.
   *
   * For handling posts translations I have the "AvailableTranslations" component
   * which allow the user know when this post has translations available and also
   * redirects he/she for the correct page
   */
  if (pathname.match(/\/blog\/.*/)) {
    return null;
  }

  return (
    <Popover>
      <Popover.Button
        as={MenuButton}
        ref={setReferenceElement as never}
        aria-label={label}
      >
        <GlobeIcon className="w-6" />
      </Popover.Button>

      <Popover.Panel
        className="z-10 flex flex-col bg-white border divide-y divide-gray-200 rounded shadow-sm max-w-min dark:border-gray-400 dark:divide-gray-500 dark:bg-blue-800"
        ref={setPopperElement as never}
        style={popperStyles.popper}
        {...attributes.popper}
      >
        <div
          ref={setArrowElement as never}
          className="z-20 w-4 h-4 bg-white border-t border-l rounded-sm dark:bg-blue-800 dark:border-gray-400 -top-2"
          style={{
            ...popperStyles.arrow,
            transform: `${popperStyles.arrow.transform} rotate(45deg)`,
          }}
        />
        <Popover.Button
          className="flex-1 px-6 py-2 font-sans text-base text-center cursor-pointer whitespace-nowrap disabled:cursor-not-allowed disabled:font-semibold disabled:text-secondary"
          disabled={lang === 'en'}
          onClick={() => changeLocale('en')}
          aria-label="Switch to English"
        >
          English
        </Popover.Button>

        <Popover.Button
          className="flex-1 px-6 py-2 font-sans text-base text-center cursor-pointer whitespace-nowrap disabled:cursor-not-allowed disabled:font-semibold disabled:text-secondary"
          disabled={lang === 'pt'}
          onClick={() => changeLocale('pt')}
          aria-label="Mudar para Português"
        >
          Português
        </Popover.Button>
      </Popover.Panel>
    </Popover>
  );
}

function changeLocale(lang: SupportedLanguages) {
  const pathnameWithoutLocale = getPathnameWithoutLocale(
    window.location.pathname,
  );

  window.location.href = `/${lang}${pathnameWithoutLocale}`;
}
