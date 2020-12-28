import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Tabs, TabsProps } from './Tabs';
import { Tab } from '../Tab';

const meta: Meta = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    value: {
      control: {
        type: 'number',
      },
    },
    onTabChange: {
      action: 'onTabChange (index)',
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export const TabsWithTab: Story<TabsProps> = args => (
  <Tabs {...args}>
    <Tab label="Posts" />
    <Tab label="Series" />
    <Tab label="Singles" />
  </Tabs>
);
