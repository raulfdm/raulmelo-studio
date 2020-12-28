import React from 'react';
import classNames from 'classnames';

import { TabProps } from '../Tab';

export const Tabs = ({
  className,
  children,
  onTabChange,
  value = 0,
  ...props
}: TabsProps) => {
  const [currentSelected, setCurrentSelected] = React.useState(value);

  function cloneTabWithProps(tag: React.ReactElement<TabProps>, index: number) {
    return React.cloneElement(tag as React.ReactElement<TabProps>, {
      index,
      onClick: () => {
        onTabChange(index);
        setCurrentSelected(index);
      },
      isActive: index == currentSelected,
    });
  }

  return (
    <ul
      className={classNames([
        'flex mb-5 border-b border-gray-400 dark:border-gray-600 border-opacity-20',
        className,
      ])}
      role="tabpanel"
      {...props}
    >
      {React.Children.map(children as React.ReactElement, cloneTabWithProps)}
    </ul>
  );
};

export type TabsProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  onTabChange: (index: number) => void;
  value?: number | string;
};
