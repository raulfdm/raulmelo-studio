import React from 'react';
import tw, { css } from 'twin.macro';
import { ChevronLeftIcon, ChevronRightIcon } from '../Icons';
import { PaginationItemProps } from './types';

const iconsTypeMap = {
  previous: ChevronLeftIcon,
  next: ChevronRightIcon,
};

const styles = {
  ellipsis: tw`w-6 text-center`,
  item: (selected: boolean) => css`
    min-width: 1.5rem;

    ${tw`text-center`};
    ${tw`cursor-pointer`};
    ${tw`text-lg`};
    ${tw`tabular-nums`};
    ${selected && tw`border-black dark:border-white border-b font-bold`};
    ${!selected && tw`hover:font-bold`}
  `,
  icon: (disabled: boolean) => css`
    ${tw`w-6`};
    ${disabled ?? tw`opacity-50`}
  `,
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
    <div css={styles.ellipsis}>…</div>
  ) : (
    <ItemComponent disabled={disabled} css={styles.item(selected)} {...other}>
      {type === 'page' && page}
      {Icon ? <Icon css={styles.icon(disabled)} /> : null}
    </ItemComponent>
  );
}
