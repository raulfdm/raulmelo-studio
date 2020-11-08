/* Reimplementation of https://github.com/jaredpalmer/react-simple-infinite-scroll
- Fix a bug that Im not able to proper pass a Component;
- Use functional component;
- Use hooks
- reduce component size
*/
import * as React from 'react';
import throttle from 'lodash.throttle';

export interface InfiniteScrollProps {
  Component: React.ElementType;
  /**
   * Does the resource have more entities
   */
  hasMore: boolean;
  /**
   * if it's loading or not
   */
  isLoading?: boolean;
  /**
   * Callback to load more entities
   */
  onLoadMore: () => void;
  /**
   * Scroll threshold
   */
  threshold?: number;
  /**
   * Throttle rate
   */
  throttleAmount?: number;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  Component,
  children,
  isLoading,
  hasMore,
  threshold = 200,
  throttleAmount = 128,
  onLoadMore,
}) => {
  const wardRef = React.useRef<HTMLDivElement | null>(null);

  function checkWindowScroll(): void {
    if (isLoading) {
      return;
    }

    if (
      hasMore &&
      wardRef.current!.getBoundingClientRect().top - window.innerHeight <
        threshold!
    ) {
      onLoadMore();
    }
  }

  React.useEffect(() => {
    const scrollHandler = throttle(checkWindowScroll, throttleAmount);
    const resizeHandler = throttle(checkWindowScroll, throttleAmount);

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <Component>
      {children}
      <div ref={wardRef}></div>
    </Component>
  );
};
