import { StrikethroughIcon } from '@raulmelo/ui';
import { type ReactNode } from 'react';

export const strikeThroughMarkerField = {
  title: `Strike Through`,
  value: `strikethrough`,
  blockEditor: {
    icon: () => (
      <div style={{ height: `25px`, display: `grid`, placeItems: `center` }}>
        <StrikethroughIcon width={20} />
      </div>
    ),
    render: ({ children }: { children: ReactNode }) => {
      return <s>{children}</s>;
    },
  },
};
