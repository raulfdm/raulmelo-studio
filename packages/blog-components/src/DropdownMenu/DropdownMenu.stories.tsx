import { Meta, Story } from '@storybook/react';
import React from 'react';
import { GlobeIcon } from '..';

import { DropdownMenu, Dropdown, dropdownItemClasses } from './DropdownMenu';

const meta: Meta = {
  title: 'components/DropdownMenu',
  component: DropdownMenu,
};

export default meta;

export const languageMenuExample: Story = () => (
  <>
    <DropdownMenu
      button={
        <Dropdown.Button className="p-2 flex place-content-center">
          <GlobeIcon className="w-6" />
        </Dropdown.Button>
      }
      items={
        <>
          <Dropdown.Item>
            <button className={dropdownItemClasses}>Português</button>
          </Dropdown.Item>
          <Dropdown.Item>
            <button className={dropdownItemClasses}>English</button>
          </Dropdown.Item>
        </>
      }
    />
  </>
);
