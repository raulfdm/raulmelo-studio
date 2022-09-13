import { sanityToUiAdapter } from '@raulmelo/sanity-core';
import { DividerIcon, DotDivider } from '@raulmelo/ui';
import React from 'react';

export const dividerField = {
  name: 'divider',
  type: 'object',
  title: 'Section Divider',
  icon: () => <DividerIcon width={20} />,
  fields: [
    {
      initialValue: true,
      name: 'hr',
      type: 'boolean',
    },
  ],
  preview: {
    component: sanityToUiAdapter(DotDivider),
  },
};
