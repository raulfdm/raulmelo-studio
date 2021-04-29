import { ChevronLeftIcon, ChevronRightIcon } from '@components/Icons';
import Image from 'next/image';
import { useCircularIndexes } from '@hooks/useCircularIndexes';
import React from 'react';
import tw, { css, styled } from 'twin.macro';
import { validations } from './utils';

const Figure = styled.figure`
  /* && to gain precedence over prose class */
  && {
    margin: 0;
  }
`;

const NavButton = tw.button`
    w-8 h-8
    p-2
    z-10
    shadow
    text-lg
    rounded-full
    bg-white dark:bg-blue-700
    transition-theme duration-200 ease
`;

export const ImageSlider = ({ images }: ImageSliderProps) => {
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
    <div tw="relative p-2" data-testid="image-slider">
      <Figure data-sliderfigure>
        <Image
          layout="responsive"
          src={currentImage.src}
          width={currentImage.width}
          height={currentImage.height}
          alt={currentImage.alt}
        />
        {!currentImage.noCaption ? (
          <figcaption tw="text-center" data-testid="caption">
            {currentImage.alt}
          </figcaption>
        ) : null}
      </Figure>

      {shouldRenderAction ? (
        <div
          css={[
            tw`flex justify-between absolute right-0 left-0 top-0 h-7 -mx-3`,
            css`
              transform: translateY(${actionsPosition}px);
            `,
          ]}
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

export type SliderImageProps = {
  src: string;
  alt: string;
  noCaption?: boolean;
  width: string | number;
  height: string | number;
};

export type ImageSliderProps = {
  images: SliderImageProps[];
};
