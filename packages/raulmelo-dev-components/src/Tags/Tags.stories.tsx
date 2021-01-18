import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Tags, TagsProps } from './Tags';
import { Tag } from '../Tag';

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

export const withTag: Story<TagsProps> = () => (
  <Tags>
    <Tag>#some-tag</Tag>
    <Tag>#another-tag</Tag>
  </Tags>
);

export const withTagLinks: Story<TagsProps> = () => (
  <Tags>
    <Tag>
      <a href="#">#some-tag</a>
    </Tag>
    <Tag>
      <a href="#">#another-tag</a>
    </Tag>
  </Tags>
);

export const withManyItems: Story<TagsProps> = () => (
  <Tags>
    <Tag>#JavaScript</Tag>
    <Tag>#Typescript</Tag>
    <Tag>#Tooling</Tag>
    <Tag>#FrontEnd</Tag>
    <Tag>#CSS</Tag>
  </Tags>
);
