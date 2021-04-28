import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Tags, Tag } from './Tags';

const meta: Meta = {
  title: 'Components/Tags',
  component: Tags,
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

export const withTag: Story = () => (
  <Tags>
    <Tag>#some-tag</Tag>
    <Tag>#another-tag</Tag>
  </Tags>
);

export const withTagLinks: Story = () => (
  <Tags>
    <Tag>
      <a href="#">#some-tag</a>
    </Tag>
    <Tag>
      <a href="#">#another-tag</a>
    </Tag>
  </Tags>
);

export const withManyItems: Story = () => (
  <Tags>
    <Tag>#JavaScript</Tag>
    <Tag>#Typescript</Tag>
    <Tag>#Tooling</Tag>
    <Tag>#FrontEnd</Tag>
    <Tag>#CSS</Tag>
  </Tags>
);
