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

  const activeClasses = [
    'sm:pl-3',
    'border-b-2 sm:border-l-2 sm:border-b-0',
    'border-black dark:border-gray-300 border-opacity-80',
  ];
  return (
    <li className={classNames(['px-4 py-2', 'text-center sm:text-left'])}>
      <ConfiguredLink
        onClick={onClick}
        href={href}
        className={classNames([
          'cursor-pointer',
          'font-serif font-black',
          'text-xl sm:text-lg',
          'mx-5',
          active && activeClasses,
        ])}
      >
        {itemLabel}
      </ConfiguredLink>
    </li>
  );
};
