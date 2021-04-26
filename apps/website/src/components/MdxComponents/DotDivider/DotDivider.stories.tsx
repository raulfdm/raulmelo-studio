import { Meta, Story } from '@storybook/react';
import React from 'react';

import { DotDivider } from '.';
import {
  ProseContainer,
  ProseContainerProps,
} from '@components/ProseContainer';

const meta: Meta = {
  title: 'Mdx Components/DotDivider',
  component: DotDivider,
  decorators: [
    (Story: React.ElementType) => (
      <ProseContainer>
        <Story />
      </ProseContainer>
    ),
  ],
};

export default meta;

export const defaultCase: Story<ProseContainerProps> = () => (
  <>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cum.</p>

    <DotDivider />

    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam veritatis
      eos quia voluptatibus id, iste architecto aperiam quo facilis laboriosam
      sunt qui? Quaerat dignissimos ducimus magni natus amet consequuntur
      corrupti?
    </p>
  </>
);
