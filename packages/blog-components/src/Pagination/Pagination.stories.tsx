import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Pagination, PaginationProps } from '.';
import { PaginationItem } from './PaginationItem';

const meta: Meta = {
  title: 'components/Pagination',
  component: Pagination,
  argTypes: {
    count: {
      defaultValue: 10,
      control: {
        type: 'number',
      },
    },
  },
  decorators: [(Story: React.ElementType) => <Story />],
};

export default meta;

export const defaultCase: Story<PaginationProps> = args => (
  <Pagination {...args} onChange={console.log} />
);

export const withCustomRenderItem: Story<PaginationProps> = args => {
  const Link = (props: any) => <a {...props} />;

  return (
    <Pagination
      {...args}
      onChange={console.log}
      defaultPage={3}
      renderItem={item => <PaginationItem {...item} component={Link} />}
    />
  );
};
