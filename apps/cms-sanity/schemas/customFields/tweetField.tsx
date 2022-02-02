import { Tweet } from '@raulmelo/ui';

import { sanityToUiAdapter } from '../../utils/schema';

export const tweetField = {
  type: 'object',
  name: 'tweet',
  title: 'Tweet',
  fields: [
    {
      name: 'tweetId',
      type: 'string',
      title: 'The tweet ID',
    },
  ],
  preview: {
    select: {
      tweetId: 'tweetId',
    },
    component: sanityToUiAdapter(Tweet),
  },
};
