import { useState } from 'react';

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
