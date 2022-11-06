import { sanityToUiAdapter } from '@raulmelo/sanity-core';
import { CodePenIcon, CodePenIframe } from '@raulmelo/ui';

export const codePenField = {
  type: 'object',
  name: 'codePen',
  title: 'CodePen',
  icon: () => <CodePenIcon width={20} />,
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
