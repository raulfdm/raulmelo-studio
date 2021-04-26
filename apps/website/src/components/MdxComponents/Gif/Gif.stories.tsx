import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Gif, GifProps } from '.';
import { ProseContainer } from '../ProseContainer';

const meta: Meta = {
  title: 'Mdx Components/Gif',
  component: Gif,
  argTypes: {
    width: {
      defaultValue: 300,
      control: {
        type: 'number',
      },
    },
    height: {
      defaultValue: 300,
      control: {
        type: 'number',
      },
    },
    src: {
      defaultValue:
        'https://media.giphy.com/media/YqnXSeq7AFSYjAAhpU/giphy.gif',
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

export const defaultCase: Story<GifProps> = (args) => <Gif {...args} />;
