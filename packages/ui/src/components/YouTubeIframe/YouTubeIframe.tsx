import 'twin.macro';

import React from 'react';

export const YouTubeIframe = ({ src, videoId }: YouTubeIframeProps) => {
  if (src) {
    throw new Error(
      `YouTubeIframe: "src" is no longer allowed. Use "videoId" instead`,
    );
  }

  if (!videoId) {
    throw new Error(`YouTubeIframe: "videoId" is required`);
  }

  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  /**
   * The reasons for defining here the code from iframe-responsive
   * is because with a custom component, remark does not know what kind
   * of html element is it and puts under a paragraph <p>
   * As consequence of that, responsive-iframe plugin cannot identify this iframe
   * and does not apply the wrapper and styles for it.
   *
   * This sucks but it seems a limitation of using first remark, then react-rehype */
  return (
    <div tw="w-full h-0 relative overflow-hidden aspect-w-16 aspect-h-9">
      <iframe
        tw="absolute top-0 left-0 h-full w-full"
        src={videoSrc}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        data-testid="youtube-iframe"
        title="YouTube Video"
      />
    </div>
  );
};

export type YouTubeIframeProps = {
  src?: string;
  videoId?: string;
};
