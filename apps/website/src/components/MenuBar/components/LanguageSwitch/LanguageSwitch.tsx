import { Popover } from '@headlessui/react';
import { GlobeIcon } from '@raulmelo/ui';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { usePopper } from 'react-popper';

import { MenuButton } from '~/components/MenuBar';
import { useLocalization } from '~/hooks/useLocalization';

export const LanguageSwitch = () => {
  const { switchToEnglish, switchToPortuguese, locale } = useLocalization();
  const { asPath } = useRouter();

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
  if (asPath.match(/\/blog\/.*/)) {
    return null;
  }

  return (
    <Popover>
      <Popover.Button as={MenuButton} ref={setReferenceElement as never}>
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
          className="bg-white dark:bg-blue-800 z-20 w-4 h-4 border-t border-l rounded-sm dark:border-gray-400 top[-8px]"
          style={{
            ...popperStyles.arrow,
            transform: `${popperStyles.arrow.transform} rotate(45deg)`,
          }}
        />
        <Popover.Button
          className="flex-1 px-6 py-2 font-sans text-base text-center cursor-pointer whitespace-nowrap disabled:cursor-not-allowed disabled:font-semibold disabled:text-secondary"
          disabled={locale === 'en'}
          onClick={switchToEnglish}
        >
          English
        </Popover.Button>

        <Popover.Button
          className="flex-1 px-6 py-2 font-sans text-base text-center cursor-pointer whitespace-nowrap disabled:cursor-not-allowed disabled:font-semibold disabled:text-secondary"
          disabled={locale === 'pt'}
          onClick={switchToPortuguese}
        >
          Português
        </Popover.Button>
      </Popover.Panel>
    </Popover>
  );
};
