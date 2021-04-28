import { Meta, Story } from '@storybook/react';
import React from 'react';
import { SideMenu } from './SideMenu';

const meta: Meta = {
  title: 'components/SideMenu',
  component: SideMenu,
  argTypes: {
    items: {
      defaultValue: [
        {
          href: '#',
          itemLabel: 'Test 1',
        },
        {
          href: '#',
          itemLabel: 'Test 2',
        },
        {
          href: '#',
          itemLabel: 'Test 3',
        },
        {
          href: '#',
          itemLabel: 'Test 4',
        },
      ],
    },
    state: {
      defaultValue: 'open',
    },
    activeItem: {
      defaultValue: 'Test 1',
    },
  },
};

export default meta;

export const defaultCase: Story = (args) => <SideMenu {...args} />;
