import styled from '@emotion/styled';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  useCircularIndexes,
} from '@raulfdm/blog-components';
import classNames from 'classnames';
import omit from 'lodash.omit';
import React from 'react';

import { validations } from './utils';

const Figure = styled.figure`
  /* && to gain precedence over prose class */
  && {
    margin: 0;
  }
`;

export const ImageSlider = ({
  images,
  ImageComponent = 'img',
}: ImageSliderProps) => {
  const { currentIndex, nextIndex, prevIndex } = useCircularIndexes(
    images.length,
  );
  const currentImage = images[currentIndex];
  validations(currentImage);

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

  const actionsPosition = getActionsTransformValue();
  const shouldRenderAction = images.length > 1 && actionsPosition > 0;

  return (
    <div className="relative p-2" data-testid="image-slider">
      <Figure data-sliderfigure>
        <ImageComponent {...omit(currentImage, ['noCaption'])} />
        {!currentImage.noCaption ? (
          <figcaption className="text-center" data-testid="caption">
            {currentImage.alt}
          </figcaption>
        ) : null}
      </Figure>

      {shouldRenderAction ? (
        <div
          className={classNames([
            'flex justify-between',
            'absolute right-0 left-0 top-0',
            'h-7',
            '-mx-3',
          ])}
          style={{ transform: `translateY(${actionsPosition}px)` }}
          data-testid="actions-wrapper"
        >
          <NavButton onClick={prevIndex} data-testid="prev-image">
            <ChevronLeftIcon />
          </NavButton>
          <NavButton onClick={nextIndex} data-testid="next-image">
            <ChevronRightIcon />
          </NavButton>
        </div>
      ) : null}
    </div>
  );
};

function NavButton({ className, ...props }: NavButtonProps) {
  return (
    <button
      className={classNames([
        'w-8 h-8',
        'p-2',
        'z-10',
        'shadow',
        'flex justify-center items-center',
        'text-lg',
        'rounded-full',
        'bg-white dark:bg-blue-700',
        'transition-theme duration-200 ease',
        className,
      ])}
      {...props}
    />
  );
}

type NavButtonProps = React.ComponentPropsWithoutRef<'button'>;

export type SliderImageProps = {
  src: string;
  alt: string;
  noCaption?: boolean;
  width?: string | number;
  height?: string | number;
};

export type ImageSliderProps = {
  images: SliderImageProps[];
} & ImageSliderConfig;

export type ImageSliderConfig = {
  /**
   * Will be used to add a hidden text for screen readers
   */
  ImageComponent?: React.ElementType;
};

export function ImageSliderFactory(config?: ImageSliderConfig) {
  return function ImageSliderConfigured(props: ImageSliderProps) {
    return <ImageSlider {...props} {...config} />;
  };
}
