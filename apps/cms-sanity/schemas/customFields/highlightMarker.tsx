// eslint-disable-next-line simple-import-sort/imports
import React from 'react';
import { Highlight, HighlightIcon } from '@raulmelo/ui';

export const highlightMarker = {
  title: 'Highlight',
  value: 'highlight',
  blockEditor: {
    icon: () => (
      <div style={{ height: '25px', display: 'grid', placeItems: 'center' }}>
        <HighlightIcon width={16} />
      </div>
    ),
    render: ({ children }) => {
      return <Highlight>{children}</Highlight>;
    },
  },
};
