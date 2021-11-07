import 'twin.macro';

import React from 'react';

import { PaginationItem } from './PaginationItem';
import {
  GetItemAriaLabelProps,
  PaginationItemProps,
  PaginationProps,
} from './types';
import { usePagination } from './usePagination';

export const Pagination = (props: PaginationProps) => {
  const {
    getItemAriaLabel = defaultGetAriaLabel,
    renderItem = (item: PaginationItemProps) => <PaginationItem {...item} />,
  } = props;

  const { items } = usePagination({
    ...props,
    componentName: 'Pagination',
  });

  return (
    <nav
      aria-label="pagination navigation"
      tw="flex justify-center mt-6 col-span-full"
    >
      <ul tw="flex items-stretch justify-items-center list-none space-x-2">
        {items.map((item, index) => {
          const { type, page, selected } = item;
          return (
            <li
              key={index}
              tw="flex justify-items-center items-stretch text-xl"
            >
              {renderItem({
                ...item,
                'aria-label': getItemAriaLabel({ type, page, selected }),
              })}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

function defaultGetAriaLabel({ type, page, selected }: GetItemAriaLabelProps) {
  if (type === 'page') {
    return `${selected ? '' : 'Go to '}page ${page}`;
  }

  return `Go to ${type} page`;
}
