import classNames from 'classnames';
import React from 'react';
import { configureLink } from '../ConfiguredLink';

export type SideMenuItemProps = {
  active?: boolean;
  href: string;
  itemLabel: React.ReactNode;
  Link?: React.ElementType;
  onClick?: () => void;
};

export const SideMenuItem = ({
  active = false,
  href,
  itemLabel,
  Link,
  onClick,
}: SideMenuItemProps) => {
  const ConfiguredLink = configureLink(Link);

  return (
    <ConfiguredLink
      onClick={onClick}
      href={href}
      className={classNames([
        'cursor-pointer',
        'font-serif text-lg font-bold',
        'mx-5',
        active && 'pl-3 border-l-2 border-gray-800 dark:border-gray-300',
      ])}
    >
      {itemLabel}
    </ConfiguredLink>
  );
};
