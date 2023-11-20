import type { BlockDecoratorDefinition } from 'sanity';

import { IconStrikethrough } from '@/ui/icons-react';

export const strikeThroughMarkerField: BlockDecoratorDefinition = {
  title: `Strike Through`,
  value: `strikethrough`,
  component: ({ children, ...props }) => {
    return <s {...props}>{children}</s>;
  },
  icon: () => (
    <div style={{ height: `25px`, display: `grid`, placeItems: `center` }}>
      <IconStrikethrough size={20} />
    </div>
  ),
};
