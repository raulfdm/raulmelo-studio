import { sanityToUiAdapter } from '@raulmelo/sanity-core';
import { Tweet, TwitterIcon } from '@raulmelo/ui';

export const tweetField = {
  type: `object`,
  name: `tweet`,
  title: `Tweet`,
  icon: () => <TwitterIcon width={20} />,
  fields: [
    {
      name: `tweetId`,
      type: `string`,
      title: `The tweet ID`,
    },
  ],
  preview: {
    select: {
      tweetId: `tweetId`,
    },
    component: sanityToUiAdapter(Tweet),
  },
};
