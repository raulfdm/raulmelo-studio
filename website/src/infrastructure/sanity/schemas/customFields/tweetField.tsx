import { defineField } from 'sanity';

import { IconBrandX } from '@/ui/icons-react';

export const tweetField = defineField({
  type: `object`,
  name: `tweet`,
  title: `Tweet`,
  icon: () => <IconBrandX size={20} />,
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
