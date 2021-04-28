import React from 'react';
import { render, screen } from '@testing-library/react';

import { YouTubeIframe } from '.';

describe('<YouTubeIframe />', () => {
  it('renders with videoId', () => {
    const videoId = '3-Pf8s2nP-g';

    render(<YouTubeIframe videoId={videoId} />);

    const container = screen.getByTestId('youtube-iframe') as HTMLIFrameElement;

    expect(container.src).toMatchInlineSnapshot(
      `"https://www.youtube.com/embed/3-Pf8s2nP-g"`,
    );
    expect(container).toMatchSnapshot();
  });

  it('throws an error if neither "src" nor "directUrl" has been passed', () => {
    expect(() => render(<YouTubeIframe />)).toThrowErrorMatchingInlineSnapshot(
      `"YouTubeIframe: \\"videoId\\" is required"`,
    );
  });
});
