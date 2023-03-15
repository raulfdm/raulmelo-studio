import { IconBrandYoutube } from '@tabler/icons-react';
import { defineField } from 'sanity';

export const youtubeVideoField = defineField({
  type: 'object',
  name: 'youtubeVideo',
  title: 'Youtube Video',
  icon: () => <IconBrandYoutube width={20} />,
  fields: [
    {
      name: 'videoId',
      type: 'string',
      title: 'The video ID',
      preview: {
        select: {
          videoId: 'videoId',
        },
      },
    },
  ],
});
