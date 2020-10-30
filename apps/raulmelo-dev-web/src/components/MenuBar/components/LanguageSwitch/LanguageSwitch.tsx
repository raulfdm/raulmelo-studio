import { Language } from '@styled-icons/material/Language';
import { FormattedMessage } from 'react-intl';

import { useLocalization } from '@hooks/useLocalization';
import { DropdownMenu, DropdownMenuItem } from '@components/DropdownMenu';
import { MenuButton } from '@components/MenuBar';

export const LanguageSwitch: React.FC = () => {
  const { switchToEnglish, switchToPortuguese } = useLocalization();

  return (
    <DropdownMenu
      items={
        <>
          <DropdownMenuItem
            onClick={switchToEnglish}
            data-testid="language__english"
          >
            <FormattedMessage id="languages.en" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={switchToPortuguese}
            data-testid="language__portuguese"
          >
            <FormattedMessage id="languages.pt" />
          </DropdownMenuItem>
        </>
      }
    >
      {({ toggleDropdown }) => {
        return (
          <MenuButton onClick={toggleDropdown} data-testid="language-menu">
            <Language size={21} />
          </MenuButton>
        );
      }}
    </DropdownMenu>
  );
};
