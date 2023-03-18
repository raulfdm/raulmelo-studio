import { IconBrandTwitter } from '@tabler/icons-react';
import { defineField } from 'sanity';

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
          return tweetId;
        },
      },
    },
  ],
});
