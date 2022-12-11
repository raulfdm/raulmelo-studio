import { render, screen } from '@testing-library/react';
import React from 'react';

import { Gif } from '.';

const defaultProps = {
  src: 'https://media.giphy.com/media/YqnXSeq7AFSYjAAhpU/giphy.gif',
  width: 300,
  height: 300,
  caption: 'foo bar',
};

describe('<Gif />', () => {
  it('matches snapshot', () => {
    render(<Gif {...defaultProps} />);
    expect(screen.getByRole('figure')).toMatchSnapshot();
  });

  it('uses width to defines maxWidth to figure', () => {
    render(<Gif {...defaultProps} />);
    const figure = screen.getByRole('figure') as HTMLImageElement;

    expect(figure).toHaveStyle('max-width: 300px');
  });

  describe('img', () => {
    it('renders img with src sent', () => {
      render(<Gif {...defaultProps} />);
      const container = screen.getByRole('img') as HTMLImageElement;
      expect(container.src).toBe(defaultProps.src);
    });

    it('renders img with width and height', () => {
      render(<Gif {...defaultProps} />);
      const container = screen.getByRole('img') as HTMLImageElement;
      expect(container.width).toBe(defaultProps.width);
      expect(container.height).toBe(defaultProps.height);
    });

    it('renders custom ImageComponent', () => {
      const CustomImage = (props: any) => (
        <img data-testid="very-custom-comp" style={{ margin: 10 }} {...props} />
      );

      render(<Gif {...defaultProps} renderImage={CustomImage} />);

      const container = screen.getByTestId(
        'very-custom-comp',
      ) as HTMLImageElement;

      expect(container).toBeInTheDocument();
    });
  });

  describe('figcaption', () => {
    it('renders with text sent', () => {
      render(<Gif {...defaultProps} />);
      const caption = screen.getByRole('caption');
      expect(caption.textContent).toBe(defaultProps.caption);
    });

    it('does not render caption with undefined', () => {
      /**
       * Removing caption from "custom props"
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { caption, ...customProps } = defaultProps;

      const { queryByRole } = render(<Gif {...customProps} />);

      expect(queryByRole('caption')).not.toBeInTheDocument();
    });
  });
});
