import React from 'react';

import { YouTubeIframe } from '.';

export default {
  title: 'Mdx Components/YouTubeIframe',
  component: YouTubeIframe,
};

export const fullSrc = () => (
  <div className="max-w-md">
    <YouTubeIframe src="https://www.youtube.com/embed/3-Pf8s2nP-g" />
  </div>
);

export const withVideoId = () => (
  <div className="max-w-md">
    <YouTubeIframe videoId="AycZPxzTo90" />
  </div>
);
