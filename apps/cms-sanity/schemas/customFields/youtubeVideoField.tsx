import { YouTubeIcon, YouTubeIframe } from '@raulmelo/ui';
import React from 'react';

import { sanityToUiAdapter } from '../../utils/schema';

export const youtubeVideoField = {
  type: 'object',
  name: 'youtubeVideo',
  title: 'Youtube Video',
  icon: () => <YouTubeIcon width={20} />,
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
