import { createMachine, interpret } from 'xstate';

type SideNavEvents =
  | {
      type: 'TOGGLE';
    }
  | {
      type: 'CLOSE';
    };

export const sideNavMachine = createMachine({
  id: 'sideNav',
  initial: 'closed',
  schema: {
    events: {} as SideNavEvents,
  },
  states: {
    closed: {
      on: {
        TOGGLE: 'open',
      },
    },
    open: {
      on: {
        TOGGLE: 'closed',
        CLOSE: 'closed',
      },
    },
  },
});

export const sideNavService = interpret(sideNavMachine).start();
