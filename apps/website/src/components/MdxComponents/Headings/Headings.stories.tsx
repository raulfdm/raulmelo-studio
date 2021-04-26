import { Meta, Story } from '@storybook/react';
import React from 'react';

import * as Headings from '.';
import { ProseContainer } from '@components/ProseContainer';

const meta: Meta = {
  title: 'Mdx Components/Headings',
  argTypes: {
    children: {
      defaultValue: 'h1 - main title',
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

export const allHeadings: Story = () => (
  <div>
    <Headings.H1>Some weird Text</Headings.H1>
    <Headings.H2>Some weird Text</Headings.H2>
    <Headings.H3>Some weird Text</Headings.H3>
    <Headings.H4>Some weird Text</Headings.H4>
    <Headings.H5>Some weird Text</Headings.H5>
    <Headings.H6>Some weird Text</Headings.H6>
  </div>
);

/* This code emulates a BlogPost with rehypeSlug */
const WithCopyIcon: React.FC<{ Heading: React.ElementType }> = ({
  children,
  Heading,
}) => {
  return (
    <Heading>
      <a className="copy-title-icon" href="#">
        <span
          className="icon icon-link"
          style={{
            mask: 'url(/icons/anchor.svg) no-repeat',
          }}
        ></span>
      </a>
      {children}
    </Heading>
  );
};

export const withCopyAnchor = () => {
  return (
    <div>
      <WithCopyIcon Heading={Headings.H1}>Some weird Text</WithCopyIcon>
      <WithCopyIcon Heading={Headings.H2}>Some weird Text</WithCopyIcon>
      <WithCopyIcon Heading={Headings.H3}>Some weird Text</WithCopyIcon>
      <WithCopyIcon Heading={Headings.H4}>Some weird Text</WithCopyIcon>
      <WithCopyIcon Heading={Headings.H5}>Some weird Text</WithCopyIcon>
      <WithCopyIcon Heading={Headings.H6}>Some weird Text</WithCopyIcon>
    </div>
  );
};
