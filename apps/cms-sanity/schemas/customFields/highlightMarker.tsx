// eslint-disable-next-line simple-import-sort/imports
import React from 'react';
import { Highlight } from '@raulmelo/ui';

export const highlightMarker = {
  title: 'Highlight',
  value: 'highlight',
  blockEditor: {
    render: ({ children }) => {
      return <Highlight>{children}</Highlight>;
    },
  },
};
