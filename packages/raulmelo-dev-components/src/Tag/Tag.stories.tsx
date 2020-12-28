import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Tag, TagProps } from './Tag';

const meta: Meta = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export const defaultCase: Story<TagProps> = args => (
  <Tag {...args}>#some-tag</Tag>
);

export const withElementChildren: Story<TagProps> = args => (
  <Tag {...args}>
    <a href="#">#some-tag</a>
  </Tag>
);
