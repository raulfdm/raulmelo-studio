import { Meta, Story } from '@storybook/react';
import React from 'react';

import 'twin.macro';
import { PostCard, PostCardProps } from './PostCard';

const meta: Meta = {
  title: 'components/PostCard',
  component: PostCard,
  argTypes: {
    imageUrl: {
      defaultValue:
        'https://raulmelo.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fduzei21zt%2Fimage%2Fupload%2Fv1614526806%2Fsite%2Ftest_package_locally_c23fd1f543.jpg&w=1920&q=75',
    },
    title: {
      defaultValue: 'How to test publishing your JavaScript package locally',
    },
    subtitle: {
      defaultValue:
        "A simple and quick way of validating if you're publishing is correct.",
    },
    publishDate: {
      defaultValue: 'Nov 29, 2020',
    },
    postUrl: {
      defaultValue: '#',
    },
    tags: {
      defaultValue: [
        {
          name: 'JavaScript',
          href: '#',
        },
        {
          name: 'Tooling',
          href: '#',
        },
      ],
    },
  },
  decorators: [
    (Story: React.ElementType) => (
      <div tw="container mx-auto px-4 md:px-0 max-w-screen-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const defaultCase: Story<PostCardProps> = (args) => (
  <PostCard {...args} />
);
