import { defineField } from 'sanity';

import { TwitterIcon } from './Icons/TwitterIcon';

export const tweetField = defineField({
  type: `object`,
  name: `tweet`,
  title: `Tweet`,
  icon: () => <TwitterIcon width={20} />,
  fields: [
    {
      name: `tweetId`,
      type: `string`,
      title: `The tweet ID`,
      preview: {
        select: {
          tweetId: `tweetId`,
        },
        prepare({ tweetId }) {
          return tweetId;
        },
      },
    },
  ],
});
