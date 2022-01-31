import { useState } from 'react';

import { SliderImageProps } from './ImageSlider';

/**
 * The main focus of this component is to be used with mdx pipeline and
 * unfortunately it's very hard to identify when some required props was forgotten.
 *
 * So, this method only exists to help recognize when I forget to pass a prop
 */
export function validations(image: SliderImageProps): void {
  if (!image.src) {
    throw new Error('ImageSlider: image requires "src"');
  }

  if (!image.alt) {
    throw new Error('ImageSlider: image requires "alt"');
  }
}

export function useCircularIndexes(arrayLength: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalIndexes = arrayLength - 1;

  return {
    currentIndex,
    nextIndex() {
      let nextIndex = currentIndex + 1;

      if (nextIndex > totalIndexes) {
        nextIndex = 0;
      }

      setCurrentIndex(nextIndex);
    },
    prevIndex() {
      let nextIndex = currentIndex - 1;

      if (nextIndex < 0) {
        nextIndex = totalIndexes;
      }

      setCurrentIndex(nextIndex);
    },
  };
}
