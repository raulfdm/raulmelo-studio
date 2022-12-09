import { YouTubeIcon, YouTubeIframe } from '@raulmelo/ui';

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
  components: {
    component: YouTubeIframe,
  },
  preview: {
    select: {
      videoId: 'videoId',
    },
  },
};
