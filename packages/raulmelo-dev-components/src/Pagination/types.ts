export type PaginationType =
  | 'page'
  | 'first'
  | 'last'
  | 'next'
  | 'previous'
  | 'start-ellipsis'
  | 'end-ellipsis';

export interface UsePaginationItem {
  onClick: React.ReactEventHandler;
  type: PaginationType;
  page: number | null;
  selected: boolean;
  disabled: boolean;
}

export type PaginationItemProps = UsePaginationItem & {
  'aria-label': string;
  component?: (
    props: Pick<UsePaginationItem, 'disabled' | 'onClick'>
  ) => JSX.Element;
};
export interface UsePaginationProps {
  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount?: number;
  /**
   * The name of the component where this hook is used.
   */
  componentName?: string;
  /**
   * The total number of pages.
   * @default 1
   */
  count?: number;
  /**
   * The page selected by default when the component is uncontrolled.
   * @default 1
   */
  defaultPage?: number;
  /**
   * If `true`, the pagination component will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, hide the next-page button.
   * @default false
   */
  hideNextButton?: boolean;
  /**
   * If `true`, hide the previous-page button.
   * @default false
   */
  hidePrevButton?: boolean;
  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChange?: (event: React.ChangeEvent<unknown>, page: number | null) => void;
  /**
   * The current page.
   */
  page?: number;
  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton?: boolean;
  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton?: boolean;
  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount?: number;
}

export type GetItemAriaLabelProps = {
  type: PaginationType;
  page: PaginationItemProps['page'];
  selected: PaginationItemProps['selected'];
};

export type GetItemAriaLabel = (args: GetItemAriaLabelProps) => string;

export type ItemType = PaginationType | number;

export type PaginationProps = {
  count: number;
  getItemAriaLabel?: GetItemAriaLabel;
  renderItem?: (item: PaginationItemProps) => React.ReactNode;
  className?: string;
  defaultPage?: number;
} & UsePaginationProps;
