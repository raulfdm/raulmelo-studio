import { createMachine } from '@xstate/fsm';
import { useMachine } from '@xstate/react/lib/fsm';
import classNames from 'classnames';
import React, { useRef } from 'react';
import { useClickAway } from '../hooks';
import { DropdownMenuProps } from './types';

type ToggleEvent = {
  type: 'TOGGLE';
};

type TurnOffEvent = {
  type: 'HIDE';
};

type MachinesEvent = ToggleEvent | TurnOffEvent;

const dropdownMachine = createMachine<never, MachinesEvent>({
  initial: 'hidden',
  states: {
    hidden: {
      on: {
        TOGGLE: 'visible',
      },
    },
    visible: {
      on: {
        TOGGLE: 'hidden',
        HIDE: 'hidden',
      },
    },
  },
});

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  children,
}) => {
  const [current, send] = useMachine(dropdownMachine);
  const ref = useRef(null);

  useClickAway(ref, () => send('HIDE'));

  const isVisible = current.matches('visible');

  return (
    <div className="relative flex items-center content-center" ref={ref}>
      {children({
        isVisible,
        toggleDropdown: () => {
          send('TOGGLE');
        },
      })}

      {isVisible && (
        <div className="relative z-20">
          <ul
            onClick={(event) => {
              event.persist();
              send('HIDE');
            }}
            className={classNames([
              'flex flex-col',
              'shadow',
              'max-w-xs',
              'border rounded dark:border-gray-400',
              'divide-y divide-gray-200 dark:divide-gray-500',
              'absolute right-0 top-5',
              'bg-white dark:bg-blue-800',
            ])}
          >
            {items}
          </ul>
        </div>
      )}
    </div>
  );
};

export const DropdownMenuItem = (
  props: React.ComponentPropsWithoutRef<'li'>,
) => {
  return (
    <li
      className={classNames([
        'text-base font-sans text-center',
        'cursor-pointer',
        'py-2 px-6',
        'whitespace-nowrap',
        'flex-1',
      ])}
      {...props}
    />
  );
};
