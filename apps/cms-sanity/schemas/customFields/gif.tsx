import { Gif } from '@raulmelo/ui';

import { sanityToUiAdapter } from '../../utils/schema';

export const gifField = {
  type: 'object',
  name: 'gif',
  title: 'GIF',
  fields: [
    {
      name: 'src',
      type: 'url',
    },
    {
      name: 'caption',
      type: 'string',
    },
    {
      name: 'width',
      type: 'number',
    },
    {
      name: 'height',
      type: 'number',
    },
  ],
  preview: {
    select: {
      src: 'src',
      caption: 'caption',
      width: 'width',
      height: 'height',
    },
    component: sanityToUiAdapter(Gif),
  },
};
