import classNames from 'classnames';
import React from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '../Icons';
import { PaginationItemProps } from './types';

const iconsTypeMap = {
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
    Icon = iconsTypeMap[type];
  }

  const ItemComponent = component ?? 'button';

  return type === 'start-ellipsis' || type === 'end-ellipsis' ? (
    <div className="w-6 text-center">…</div>
  ) : (
    <ItemComponent
      disabled={disabled}
      className={classNames([
        'min-w-[1.5rem]',
        'text-center',
        'cursor-pointer',
        'text-lg',
        'tabular-nums',
        selected && 'border-black dark:border-white border-b font-bold',
        !selected && 'hover:font-bold',
      ])}
      {...other}
    >
      {type === 'page' && page}
      {Icon ? (
        <Icon className={classNames([disabled && 'opacity-50', 'w-6'])} />
      ) : null}
    </ItemComponent>
  );
}
