/* eslint-disable @typescript-eslint/ban-ts-comment */
import { assign, createMachine } from '@xstate/fsm';
import { useMachine } from '@xstate/react/lib/fsm';
import { useWindowScroll } from 'react-use';
import { useEffect } from 'react';

export function useHideMenu(): 'open' | 'closed' {
  const [current, send] = useMachine(scrollMachine);
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

const scrollMachine = createMachine<Context, MachineEvents>(
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
      updateDirections: assign((context, event) => {
        const { currentY } = context;

        /**
         * Because of the UNION, event can be typeof "reset"
         * which does not contains "y".
         *
         * GO TYPESCRIPT!!!1!
         */
        if ('y' in event) {
          const { y } = event;
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
        }

        return context;
      }),
      resetMachine: assign(initialState),
    },
  },
);

type ScrollEvent = {
  type: 'SCROLL';
  y: number;
};

type ResetEvent = { type: 'RESET' };

type MachineEvents = ScrollEvent | ResetEvent;

type Context = {
  direction: 'down' | 'up';
  currentY: number;
  previousY: number;
};
