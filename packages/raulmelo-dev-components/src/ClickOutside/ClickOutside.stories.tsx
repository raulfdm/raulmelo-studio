import React from 'react';
import { Meta, Story } from '@storybook/react';

import { ClickOutside, ClickOutsideProps } from '.';

const meta: Meta = {
  title: 'Components/ClickOutside',
  component: ClickOutside,
  argTypes: {
    handleClickOutside: {
      action: 'handleClickOutside',
    },
  },
};

export default meta;

export const defaultCase: Story<ClickOutsideProps> = args => (
  <ClickOutside {...args}>
    <button className="py-2 px-4 bg-gray-500 rounded text-white">
      Click outside of this button
    </button>
  </ClickOutside>
);
