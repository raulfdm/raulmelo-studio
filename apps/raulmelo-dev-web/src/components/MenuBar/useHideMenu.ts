/* eslint-disable @typescript-eslint/ban-ts-comment */
import { assign, createMachine } from '@xstate/fsm';
import { useMachine } from '@xstate/react/lib/fsm';
import { useWindowScroll } from 'react-use';
import { useEffect } from 'react';

export function useHideMenu(): 'open' | 'closed' {
  // @ts-ignore
  const [current, send] = useMachine(scrollMachine);
  const { y } = useWindowScroll();

  useEffect(() => {
    send({ type: 'SCROLL', y });
  }, [y]);

  return current.context.menuState ?? 'open';
}

type ScrollEvent = {
  type: 'SCROLL';
  y: number;
};

type Context = {
  direction: 'down' | 'up' | undefined;
  currentY: number;
  menuState: 'open' | 'closed' | undefined;
};

const context = {
  direction: undefined,
  currentY: 0,
  menuState: undefined,
};

const scrollMachine = createMachine<Context, ScrollEvent>(
  {
    initial: 'idle',
    context,
    states: {
      idle: {
        on: {
          SCROLL: {
            target: 'scrolling',
          },
        },
      },
      scrolling: {
        on: {
          SCROLL: {
            target: 'scrolling',
            actions: 'updateY',
          },
        },
        // @ts-ignore
        after: {
          400: 'idle',
        },
        exit: 'setDirection',
      },
    },
  },
  {
    delays: {
      TOGGLE: 400,
    },
    actions: {
      updateY: assign({
        currentY: (_, event) => event.y,
        direction: ({ currentY }, { y }) => {
          const diff = currentY - y;
          return diff < 0 ? 'down' : 'up';
        },
      }),
      setDirection: assign({
        menuState: (context) => {
          return context.direction === 'down' ? 'closed' : 'open';
        },
      }),
    },
  },
);
