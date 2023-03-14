import { type BlockDecoratorDefinition } from 'sanity';

import { StrikethroughIcon } from './Icons/StrikethroughIcon';

export const strikeThroughMarkerField: BlockDecoratorDefinition = {
  title: `Strike Through`,
  value: `strikethrough`,
  component: ({ children, ...props }) => {
    return <s {...props}>{children}</s>;
  },
  icon: () => (
    <div style={{ height: `25px`, display: `grid`, placeItems: `center` }}>
      <StrikethroughIcon width={20} />
    </div>
  ),
};
