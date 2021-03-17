import * as React from 'react';
import useControlled from '../hooks/useControlled';
import { range } from '../utils/range';
import {
  ItemType,
  PaginationType,
  UsePaginationItem,
  UsePaginationProps,
} from './types';

export function usePagination(props: UsePaginationProps = {}) {
  const {
    boundaryCount = 1,
    count = 1,
    defaultPage = 1,
    disabled = false,
    hideNextButton = false,
    hidePrevButton = false,
    onChange: handleChange,
    page: pageProp,
    showFirstButton = false,
    showLastButton = false,
    siblingCount = 1,
    ...other
  } = props;

  const [page, setPageState] = useControlled({
    controlled: pageProp,
    default: defaultPage,
  }) as [number, any];

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages[0] - 2
  );

  const itemList = createItemList();

  // Convert the basic item list to PaginationItem props objects
  const items = itemList.map(createItem);

  return {
    items,
    ...other,
  };

  function handleClick(event: React.ChangeEvent, value: number | null) {
    if (!pageProp) {
      setPageState(value);
    }
    if (handleChange) {
      handleChange(event, value);
    }
  }

  // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  function createItemList() {
    return [
      ...(showFirstButton ? ['first'] : []),
      ...(hidePrevButton ? [] : ['previous']),
      ...startPages,

      // Start ellipsis
      // eslint-disable-next-line no-nested-ternary
      ...(siblingsStart > boundaryCount + 2
        ? ['start-ellipsis']
        : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),

      // Sibling pages
      ...range(siblingsStart, siblingsEnd),

      // End ellipsis
      // eslint-disable-next-line no-nested-ternary
      ...(siblingsEnd < count - boundaryCount - 1
        ? ['end-ellipsis']
        : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),

      ...endPages,
      ...(hideNextButton ? [] : ['next']),
      ...(showLastButton ? ['last'] : []),
    ] as ItemType[];
  }

  // Map the button type to its page number
  function buttonPage(type: ItemType) {
    if (typeof type === 'number') {
      return null;
    }

    if (type === 'first') {
      return 1;
    }

    if (type === 'previous') {
      return page - 1;
    }

    if (type === 'next') {
      return page + 1;
    }

    if (type === 'last') {
      return count;
    }

    return null;
  }

  function createItem(item: UsePaginationItem['type'] | number) {
    return typeof item === 'number'
      ? {
          onClick: (event: React.ChangeEvent) => {
            handleClick(event, item);
          },
          type: 'page' as PaginationType,
          page: item,
          selected: item === page,
          disabled,
          'aria-current': item === page ? 'true' : undefined,
        }
      : {
          onClick: (event: React.ChangeEvent) => {
            handleClick(event, buttonPage(item));
          },
          type: item,
          page: buttonPage(item),
          selected: false,
          disabled:
            disabled ||
            (item.indexOf('ellipsis') === -1 &&
              (item === 'next' || item === 'last' ? page >= count : page <= 1)),
        };
  }
}
