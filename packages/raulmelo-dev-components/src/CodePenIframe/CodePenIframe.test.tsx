import React from 'react';
import { render, screen } from '@testing-library/react';

import { CodePenIframe } from '.';

describe('<CodePenIframe />', () => {
  it('renders with src', () => {
    const src =
      'https://codepen.io/raulfdm/embed/VzmoRM?height=350&theme-id=light&default-tab=css,result';

    render(<CodePenIframe src={src} />);

    const container = screen.getByTestId('codepen') as HTMLIFrameElement;

    expect(container.src).toBe(src);
    expect(container).toMatchSnapshot();
  });

  it('accepts custom height', () => {
    render(
      <CodePenIframe
        src="https://codepen.io/raulfdm/embed/VzmoRM?height=350&theme-id=light&default-tab=css,result"
        height="600"
      />
    );

    const container = screen.getByTestId('codepen') as HTMLIFrameElement;

    expect(container.height).toBe('600');
    expect(container).toMatchSnapshot();
  });

  it('renders with directUrl', () => {
    render(
      <CodePenIframe
        directUrl="https://codepen.io/raulfdm/pen/VzmoRM"
        height="600"
      />
    );

    const container = screen.getByTestId('codepen') as HTMLIFrameElement;

    expect(container.src).toBe('https://codepen.io/raulfdm/embed/VzmoRM');
    expect(container).toMatchSnapshot();
  });
});
