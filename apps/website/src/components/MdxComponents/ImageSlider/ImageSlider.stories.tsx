import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ImageSlider, ImageSliderProps } from '.';
import { ProseContainer } from '@components/ProseContainer';

const meta: Meta = {
  title: 'Mdx Components/ImageSlider',
  component: ImageSlider,
  argTypes: {
    images: {
      defaultValue: [
        {
          src: 'https://picsum.photos/id/100/2500/1656',
          alt: 'A random image',
        },
        {
          src: 'https://picsum.photos/id/1/5616/3744',
          alt: 'A random image 2',
          noCaption: true,
        },
        {
          src: 'https://picsum.photos/id/10/2500/1667',
          alt: 'A random image3',
          width: 3000,
          height: 4000,
        },
      ],
    },

    locales: {
      defaultValue: {
        nextImageButton: 'Próxima Imagem',
        previousImageButton: 'Imagem Anterior',
      },
      control: {
        type: 'object',
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

export const defaultCase: Story<ImageSliderProps> = (args) => {
  return <ImageSlider {...args} />;
};
