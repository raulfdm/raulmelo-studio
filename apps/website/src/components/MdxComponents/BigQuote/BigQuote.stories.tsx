import { Meta, Story } from '@storybook/react';
import React from 'react';

import { BigQuote, BigQuoteProps } from '.';
import { ProseContainer } from '@components/ProseContainer';

const meta: Meta = {
  title: 'Mdx Components/BigQuote',
  component: BigQuote,
  argTypes: {
    children: {
      defaultValue:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, ab?',
      control: {
        type: 'text',
      },
    },
  },
  decorators: [
    (Story: React.ElementType) => (
      <ProseContainer>
        <Story />
      </ProseContainer>
    ),
  ],
};

export default meta;

export const defaultCase: Story<BigQuoteProps> = (args) => (
  <BigQuote {...args} />
);
