import classNames from 'classnames';
import React from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '../Icons';
import { PaginationItemProps } from './types';

const normalizedIcons = {
  previous: ChevronLeftIcon,
  next: ChevronRightIcon,
};

export function PaginationItem(props: PaginationItemProps) {
  const {
    disabled = false,
    page,
    selected = false,
    component,
    type = 'page',
    ...other
  } = props;

  let Icon = null;

  if (type === 'previous' || type === 'next') {
    Icon = normalizedIcons[type];
  }

  const ItemComponent = component ?? 'button';

  return type === 'start-ellipsis' || type === 'end-ellipsis' ? (
    <div className="w-6 text-center">…</div>
  ) : (
    <ItemComponent
      disabled={disabled}
      className={classNames([
        'w-6',
        'text-center',
        'cursor-pointer',
        selected && 'border-black border-b',
        !selected && 'hover:font-bold',
      ])}
      {...other}
    >
      {type === 'page' && page}
      {Icon ? (
        <Icon className={classNames([disabled && 'opacity-50'])} width={21} />
      ) : null}
    </ItemComponent>
  );
}
