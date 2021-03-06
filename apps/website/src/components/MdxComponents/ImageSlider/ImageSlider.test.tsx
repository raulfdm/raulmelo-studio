import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { ImageSlider } from '.';

const images = [
  {
    src: '/test.png',
    alt: 'random picture',
    width: 300,
    height: 200,
  },
  {
    src: '/test2.png',
    alt: 'another random picture',
    width: 300,
    height: 200,
  },
  {
    src: '/test3.png',
    alt: 'another random picture 3',
    width: 300,
    height: 200,
  },
];

describe('<ImageSlider />', () => {
  beforeAll(() => {
    /**
     * JSDOM does not return any height either via `clientHeight`, `offsetHeight`,
     * nor `getBoundingClientRect`.
     *
     * Since the code relies on the element height, the only way would be by
     * forcing mocking the result of these values altering its prototype.
     *
     * https://github.com/tannerlinsley/react-virtual/issues/29#issuecomment-657519522
     */
    window.Element.prototype.getBoundingClientRect = jest
      .fn()
      .mockReturnValue({ height: 300, width: 400 });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    const { rerender } = render(<ImageSlider images={images} />);
    /**
     * It needs to rerender to update the DOM so img is available
     * and we can render action buttons
     */
    rerender(<ImageSlider images={images} />);
    expect(screen.getByTestId('image-slider')).toMatchSnapshot();
  });

  describe('Run time validations', () => {
    it('throws error if src is undefined', () => {
      expect(() =>
        render(<ImageSlider images={[{ alt: 'Foo bar' } as any]} />),
      ).toThrowErrorMatchingInlineSnapshot(
        `"ImageSlider: image requires \\"src\\""`,
      );
    });

    it('throws error if alt is undefined', () => {
      expect(() =>
        render(
          <ImageSlider
            images={[{ src: 'https://picsum.photos/500/230' } as any]}
          />,
        ),
      ).toThrowErrorMatchingInlineSnapshot(
        `"ImageSlider: image requires \\"alt\\""`,
      );
    });
  });

  describe('Image', () => {
    it('renders first image', () => {
      render(<ImageSlider images={images} />);
      const img = screen.getByRole('img') as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.alt).toBe(images[0].alt);
    });
  });

  describe('Caption', () => {
    it('renders caption with alt text', () => {
      render(<ImageSlider images={images} />);
      const caption = screen.getByTestId('caption');

      expect(caption).toBeInTheDocument();
      expect(caption).toHaveTextContent(images[0].alt);
    });

    it('does not renders caption if image has noCaption equals true', () => {
      render(
        <ImageSlider
          images={[
            {
              ...images[0],
              noCaption: true,
            },
          ]}
        />,
      );

      expect(screen.queryByTestId('caption')).not.toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('does not render if img is not present', () => {
      render(<ImageSlider images={images} />);
      expect(screen.queryByTestId('actions-wrapper')).not.toBeInTheDocument();
    });

    it('does not render if only has a single image', () => {
      const singleImageList = images.slice(0, 1);
      const { rerender, queryByTestId } = render(
        <ImageSlider images={singleImageList} />,
      );

      rerender(<ImageSlider images={singleImageList} />);
      expect(queryByTestId('actions-wrapper')).not.toBeInTheDocument();
    });

    it('renders actions if img is present', () => {
      const { rerender } = render(<ImageSlider images={images} />);

      rerender(<ImageSlider images={images} />);
      expect(screen.getByTestId('actions-wrapper')).toBeInTheDocument();
    });

    describe('Next Image', () => {
      it('renders next image and go back to the first when it reaches the latest image', () => {
        const { rerender } = render(<ImageSlider images={images} />);

        function getImg(): HTMLImageElement {
          return screen.getByRole('img') as HTMLImageElement;
        }

        expect(getImg().alt).toBe(images[0].alt);
        rerender(<ImageSlider images={images} />);

        const nextImageBtn = screen.getByTestId('next-image');

        fireEvent.click(nextImageBtn);
        expect(getImg().alt).toBe(images[1].alt);

        fireEvent.click(nextImageBtn);
        expect(getImg().alt).toBe(images[2].alt);

        fireEvent.click(nextImageBtn);

        expect(getImg().alt).toBe(images[0].alt);
      });
    });

    describe('Previous Image', () => {
      it('renders previous image and shows the latest when reaches the first one', () => {
        const { rerender } = render(<ImageSlider images={images} />);

        function getImg(): HTMLImageElement {
          return screen.getByRole('img') as HTMLImageElement;
        }

        expect(getImg().alt).toBe(images[0].alt);
        rerender(<ImageSlider images={images} />);

        const nextImageBtn = screen.getByTestId('prev-image');

        fireEvent.click(nextImageBtn);
        expect(getImg().alt).toBe(images[2].alt);

        fireEvent.click(nextImageBtn);
        expect(getImg().alt).toBe(images[1].alt);

        fireEvent.click(nextImageBtn);

        expect(getImg().alt).toBe(images[0].alt);
      });
    });
  });
});
