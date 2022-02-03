import { YouTubeIframe } from '@raulmelo/ui';

import { sanityToUiAdapter } from '../../utils/schema';

export const youtubeVideoField = {
  type: 'object',
  name: 'youtubeVideo',
  title: 'Youtube Video',
  fields: [
    {
      name: 'videoId',
      type: 'string',
      title: 'The video ID',
    },
  ],
  preview: {
    select: {
      videoId: 'videoId',
    },
    component: sanityToUiAdapter(YouTubeIframe),
  },
};
