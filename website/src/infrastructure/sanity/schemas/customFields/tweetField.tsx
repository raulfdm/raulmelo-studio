import { defineField } from 'sanity';

import { IconBrandTwitter } from '@/ui/icons-react';

export const tweetField = defineField({
  type: `object`,
  name: `tweet`,
  title: `Tweet`,
  icon: () => <IconBrandTwitter size={20} />,
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
          return {
            title: `Tweet ID: ${tweetId}`,
          };
        },
      },
    },
  ],
});
