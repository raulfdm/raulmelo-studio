import 'twin.macro';

import { Popover } from '@headlessui/react';
import { GlobeIcon } from '@raulmelo/ui';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { usePopper } from 'react-popper';
import tw, { css, styled } from 'twin.macro';

import { MenuButton } from '~/components/MenuBar';
import { useLocalization } from '~/hooks/useLocalization';

const styles = {
  panel: css`
    ${tw`flex flex-col`};
    ${tw`shadow-sm`};
    ${tw`max-w-min`};
    ${tw`border rounded dark:border-gray-400`};
    ${tw`divide-y divide-gray-200 dark:divide-gray-500`};
    ${tw`bg-white dark:bg-blue-800`};
    ${tw`z-10`};
  `,
  arrow: css`
    ${tw`bg-white dark:bg-blue-800`};
    ${tw`z-20`};
    ${tw`w-4 h-4`};
    ${tw`border-t border-l rounded-sm dark:border-gray-400`};
    ${tw`top[-8px]`};
  `,
  item: css`
    ${tw`font-sans text-base text-center`};
    ${tw`cursor-pointer`};
    ${tw`px-6 py-2`};
    ${tw`whitespace-nowrap`};
    ${tw`flex-1`};

    &:disabled {
      ${tw`cursor-not-allowed`}
      ${tw`font-semibold text-secondary`};
    }
  `,
};

const Panel = styled.div`
  ${styles.panel};
`;

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
        <GlobeIcon tw="w-6" />
      </Popover.Button>

      <Popover.Panel
        as={Panel}
        ref={setPopperElement as never}
        style={popperStyles.popper}
        {...attributes.popper}
      >
        <div
          ref={setArrowElement as never}
          css={styles.arrow}
          style={{
            ...popperStyles.arrow,
            transform: `${popperStyles.arrow.transform} rotate(45deg)`,
          }}
        />
        <Popover.Button
          css={styles.item}
          disabled={locale === 'en'}
          onClick={switchToEnglish}
        >
          English
        </Popover.Button>

        <Popover.Button
          css={styles.item}
          disabled={locale === 'pt'}
          onClick={switchToPortuguese}
        >
          Português
        </Popover.Button>
      </Popover.Panel>
    </Popover>
  );
};
