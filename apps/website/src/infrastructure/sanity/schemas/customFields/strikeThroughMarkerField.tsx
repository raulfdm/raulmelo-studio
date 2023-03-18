import { IconStrikethrough } from '@tabler/icons-react';
import { type BlockDecoratorDefinition } from 'sanity';

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
