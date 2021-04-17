import { Menu as Dropdown, Transition } from '@headlessui/react';
import classNames from 'classnames';
import React, { Fragment } from 'react';

export { Menu as Dropdown } from '@headlessui/react';

export const dropdownItemClasses = classNames([
  'text-base font-sans text-center',
  'cursor-pointer',
  'py-2 px-6',
  'whitespace-nowrap',
  'flex-1',
]);

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  button,
}) => {
  return (
    <Dropdown>
      {({ open }) => {
        return (
          <>
            {button}
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Dropdown.Items
                static
                className={classNames([
                  'flex flex-col',
                  'shadow-sm',
                  'max-w-min',
                  'border rounded dark:border-gray-400',
                  'divide-y divide-gray-200 dark:divide-gray-500',
                  'bg-white dark:bg-blue-800',
                ])}
              >
                {items}
              </Dropdown.Items>
            </Transition>
          </>
        );
      }}
    </Dropdown>
  );
};

export type DropdownMenuProps = {
  items: React.ReactNode;
  button: React.ReactNode;
};
