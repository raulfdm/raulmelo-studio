import { useState, useMemo, Dispatch, SetStateAction } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

const defaultRectMeasure = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export type UseMeasureRect = typeof defaultRectMeasure;
type SetRef = Dispatch<SetStateAction<HTMLDivElement | null>>;

export function useMeasure(): [SetRef, UseMeasureRect] {
  const [element, ref] = useState<HTMLDivElement | null>(null);

  const [rect, setRect] = useState<UseMeasureRect>(defaultRectMeasure);

  const observer = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new window.ResizeObserver((entries) => {
        if (entries[0]) {
          console.log(entries[0].target);
          const {
            x,
            y,
            width,
            height,
            top,
            left,
            bottom,
            right,
          } = entries[0].target.getBoundingClientRect();

          setRect({ x, y, width, height, top, left, bottom, right });
        }
      });
    }
    return null;
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!element || !observer) return;

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [element]);

  return [ref, rect];
}
