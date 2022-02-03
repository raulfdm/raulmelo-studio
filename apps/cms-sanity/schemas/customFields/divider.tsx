import { DotDivider } from '@raulmelo/ui';

import { sanityToUiAdapter } from '../../utils/schema';

export const dividerField = {
  name: 'divider',
  type: 'object',
  title: 'Section Divider',
  fields: [
    {
      name: 'hr',
      type: 'boolean',
    },
  ],
  preview: {
    component: sanityToUiAdapter(DotDivider),
  },
};
