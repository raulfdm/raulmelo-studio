import classNames from 'classnames';
import { useLayoutEffect, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '../Icons';
import { useCircularIndexes, validations } from './utils';

export const ImageSlider = (props: ImageSliderProps) => {
  const { images, renderImage } = props;
  const { currentIndex, nextIndex, prevIndex } = useCircularIndexes(
    images.length,
  );
  const [actionsPosition, setActionsPosition] = useState(0);
  const currentImage = images[currentIndex];
  validations(currentImage);

  useLayoutEffect(() => {
    setActionsPosition(getActionsTransformValue());
  });

  const shouldRenderAction = images.length > 1 && actionsPosition > 0;

  return (
    <div
      className={classNames('relative p-2', {
        'mx-auto': Boolean(renderImage) === false,
      })}
      data-testid="image-slider"
    >
      <figure data-sliderfigure style={{ margin: 0 }}>
        {renderImage ? (
          renderImage(currentImage)
        ) : (
          <img
            className="mx-auto"
            src={currentImage.src}
            width={currentImage.width}
            height={currentImage.height}
            alt={currentImage.alt}
          />
        )}
        {!currentImage.noCaption ? (
          <figcaption className="text-center" data-testid="caption">
            {currentImage.alt}
          </figcaption>
        ) : null}
      </figure>

      {shouldRenderAction ? (
        <div
          className="absolute top-0 left-0 right-0 flex justify-between -mx-3 transform h-7"
          data-testid="actions-wrapper"
          style={{
            transform: `translateY(${actionsPosition}px)`,
          }}
        >
          <NavButton
            onClick={prevIndex}
            data-testid="prev-image"
            aria-label="Previous image"
          >
            <ChevronLeftIcon />
          </NavButton>
          <NavButton
            onClick={nextIndex}
            data-testid="next-image"
            aria-label="Next image"
          >
            <ChevronRightIcon />
          </NavButton>
        </div>
      ) : null}
    </div>
  );

  function getActionsTransformValue() {
    /**
     * Server Side Rendering (SSR) purposes
     */
    if (typeof document === 'undefined') {
      return 0;
    }

    /**
     * The reason I'm manipulating the DOM is because while using `next/image`,
     * it does not accept `ref` so I can pass and watch for the size and also
     * it creates a `div` around the image.
     *
     * The solution was find the `img` inside figure and only then perform
     * the calculation
     */
    const imgDOMEl = document.body.querySelector('[data-sliderfigure] img');

    if (imgDOMEl) {
      const { height } = imgDOMEl.getBoundingClientRect();
      return height / 2;
    }

    return 0;
  }
};

export type SliderImageProps = {
  src: string;
  alt: string;
  noCaption?: boolean;
  width: string | number;
  height: string | number;
};

export type ImageSliderProps = {
  images: SliderImageProps[];
  renderImage?: (image: SliderImageProps) => React.ReactNode;
};

function NavButton({ children, ...props }: any) {
  return (
    <button
      type="button"
      className="z-10 w-8 h-8 p-2 text-lg duration-200 bg-white rounded-full shadow dark:bg-blue-700 transition-theme ease "
      {...props}
    >
      {children}
    </button>
  );
}
