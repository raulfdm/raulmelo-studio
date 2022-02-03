import { CodePenIframe } from '@raulmelo/ui';

import { sanityToUiAdapter } from '../../utils/schema';

export const codePenField = {
  type: 'object',
  name: 'codePen',
  title: 'CodePen',
  fields: [
    {
      name: 'directUrl',
      type: 'url',
      title: 'CodePen URL',
    },
    {
      name: 'height',
      type: 'number',
      title: 'Iframe height',
    },
  ],
  preview: {
    select: {
      directUrl: 'directUrl',
    },
    component: sanityToUiAdapter(CodePenIframe),
  },
};
