/* eslint-disable @typescript-eslint/ban-ts-comment */
import { assign, createMachine } from '@xstate/fsm';
import { useMachine } from '@xstate/react/lib/fsm';
import { useWindowScroll } from 'react-use';
import { useEffect } from 'react';

export function useHideMenu(): 'open' | 'closed' {
  const [current, send] = useMachine(scrollMachine2);
  const { y } = useWindowScroll();

  useEffect(() => {
    if (y === 0) {
      send({ type: 'RESET' });
    } else {
      send({ type: 'SCROLL', y });
    }
  }, [y]);

  return current.value;
}

const initialState: Context = {
  direction: 'up',
  currentY: 0,
  previousY: -1,
};

const scrollMachine2 = createMachine<Context, MachineEvents>(
  {
    initial: 'open',
    context: initialState,
    states: {
      open: {
        on: {
          SCROLL: [
            {
              target: 'closed',
              cond: ({ direction }) => direction === 'down',
            },
            {
              target: 'open',
              actions: 'updateDirections',
            },
          ],
        },
      },
      closed: {
        on: {
          SCROLL: [
            {
              target: 'open',
              cond: ({ direction }) => direction === 'up',
            },
            {
              target: 'closed',
              actions: 'updateDirections',
            },
          ],
          RESET: {
            target: 'open',
            actions: 'resetMachine',
          },
        },
      },
    },
  },
  {
    actions: {
      updateDirections: assign(({ currentY }, { y }) => {
        const nextContext: Partial<Context> = {
          currentY: y,
          previousY: currentY,
        };

        if (y === 0) {
          nextContext.direction = 'up';
        } else {
          nextContext.direction = currentY - y < 0 ? 'down' : 'up';
        }

        return nextContext as Context;
      }),
      resetMachine: assign(initialState),
    },
  },
);

type MachineEvents =
  | {
      type: 'SCROLL';
      y: number;
    }
  | { type: 'RESET' };

type Context = {
  direction: 'down' | 'up';
  currentY: number;
  previousY: number;
};
