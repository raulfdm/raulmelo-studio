import classNames from 'classnames';
import React from 'react';
import Link from 'next/link';

export type SideMenuItemProps = {
  active?: boolean;
  href: string;
  itemLabel: React.ReactNode;
  onClick?: () => void;
};

export const SideMenuItem = ({
  active = false,
  href,
  itemLabel,
  onClick,
}: SideMenuItemProps) => {
  const activeClasses = [
    'sm:pl-3',
    'border-b-2 sm:border-l-2 sm:border-b-0',
    'border-black dark:border-gray-300 border-opacity-80',
  ];
  return (
    <li className={classNames(['px-4 py-2', 'text-center sm:text-left'])}>
      <Link href={href}>
        <a
          onClick={onClick}
          className={classNames([
            'cursor-pointer',
            'font-serif font-black',
            'text-xl sm:text-lg',
            'mx-5',
            active && activeClasses,
          ])}
        >
          {itemLabel}
        </a>
      </Link>
    </li>
  );
};
