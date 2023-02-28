import { Highlight, HighlightIcon } from '@raulmelo/ui';
import type { ReactNode } from 'react';

export const highlightMarkerField = {
  title: `Highlight`,
  value: `highlight`,
  blockEditor: {
    icon: () => (
      <div style={{ height: `25px`, display: `grid`, placeItems: `center` }}>
        <HighlightIcon width={16} />
      </div>
    ),
    render: ({ children }: { children: ReactNode }) => {
      return <Highlight>{children}</Highlight>;
    },
  },
};
