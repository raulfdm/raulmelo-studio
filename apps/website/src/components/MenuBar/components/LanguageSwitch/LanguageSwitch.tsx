import 'twin.macro';
import { GlobeIcon } from '@components/Icons';
import { MenuButton } from '@components/MenuBar';
import { Popover } from '@headlessui/react';
import { useLocalization } from '@hooks/useLocalization';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { usePopper } from 'react-popper';

export const LanguageSwitch = () => {
  const { switchToEnglish, switchToPortuguese } = useLocalization();
  const { pathname } = useRouter();

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
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
  });

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
  if (pathname.includes('/blog/')) {
    return null;
  }

  return (
    <Popover as={Fragment}>
      <Popover.Button as={MenuButton} ref={setReferenceElement as never}>
        <GlobeIcon tw="w-6" />
      </Popover.Button>

      <Popover.Panel
        ref={setPopperElement as never}
        style={styles.popper}
        {...attributes.popper}
        className={classNames([
          'flex flex-col',
          'shadow-sm',
          'max-w-min',
          'border rounded dark:border-gray-400',
          'divide-y divide-gray-200 dark:divide-gray-500',
          'bg-white dark:bg-blue-800',
          'z-10',
        ])}
      >
        <div
          ref={setArrowElement as never}
          className={classNames([
            'bg-white dark:bg-blue-800',
            'z-20',
            'w-4 h-4',
            'border-l border-t rounded-sm dark:border-gray-400',
          ])}
          style={{
            ...styles.arrow,
            top: -8,
            transform: `${styles.arrow.transform} rotate(45deg)`,
          }}
        />
        <button className={itemClasses} onClick={switchToEnglish}>
          English
        </button>
        <button className={itemClasses} onClick={switchToPortuguese}>
          Português
        </button>
      </Popover.Panel>
    </Popover>
  );
};

const itemClasses = classNames([
  'text-base font-sans text-center',
  'cursor-pointer',
  'py-2 px-6',
  'whitespace-nowrap',
  'flex-1',
]);
