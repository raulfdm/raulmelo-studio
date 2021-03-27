import { Meta, Story } from '@storybook/react';
import React from 'react';

import { DropdownMenu, DropdownMenuItem } from './DropdownMenu';

const meta: Meta = {
  title: 'components/DropdownMenu',
  component: DropdownMenu,
};

export default meta;

export const defaultCase: Story<ProseContainerProps> = () => (
  <>
    <DropdownMenu
      items={
        <>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
          <DropdownMenuItem>Item 4</DropdownMenuItem>
        </>
      }
    >
      {({ toggleDropdown }) => (
        <button onClick={toggleDropdown}>Click here</button>
      )}
    </DropdownMenu>
  </>
);
