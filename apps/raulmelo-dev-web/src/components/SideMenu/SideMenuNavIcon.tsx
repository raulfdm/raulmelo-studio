import React from 'react';

import { MenuAlt3 } from '@styled-icons/heroicons-outline/MenuAlt3';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { MenuButton } from '@components/MenuBar';
import { useApp } from '@hooks/useApp';

export const SideMenuNavIcon = () => {
  const { sideMenu } = useApp();

  const Icon = sideMenu.isCollapsed ? MenuAlt3 : CloseOutline;
  return (
    <MenuButton onClick={sideMenu.toggle} data-testid="side-menu-button">
      <Icon width={21} />
    </MenuButton>
  );
};
