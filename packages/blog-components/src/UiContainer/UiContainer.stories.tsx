import { Meta, Story } from '@storybook/react';
import React from 'react';

import { UiContainer } from './UiContainer';

const meta: Meta = {
  title: 'components/UiContainer',
  component: UiContainer,
};

export default meta;

export const defaultCase: Story = () => (
  <UiContainer>
    <h1>Hello</h1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus quaerat
      deserunt dolorem eligendi facere itaque vero laborum inventore est
      delectus natus quasi mollitia harum eius a alias, ut aspernatur sint?
    </p>
  </UiContainer>
);

export const withDifferentHtmlElement: Story = () => (
  <UiContainer as="main">
    <h1>Hello (with {`<main>`})</h1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus quaerat
      deserunt dolorem eligendi facere itaque vero laborum inventore est
      delectus natus quasi mollitia harum eius a alias, ut aspernatur sint?
    </p>
  </UiContainer>
);
