import { createMachine } from 'xstate';

type ClockMachineContext = {};
type ClockMachineEvents =
  | {
      type: 'TOGGLE_CLOCK';
    }
  | {
      type: 'TOGGLE_TIMER';
    }
  | {
      type: 'START';
    };

export const clockMachine = createMachine(
  {
    context: {},
    tsTypes: {} as import('./clockMachine.typegen').Typegen0,
    schema: {
      context: {} as ClockMachineContext,
      events: {} as ClockMachineEvents,
    },
    initial: 'close',
    states: {
      close: {
        on: {
          TOGGLE_CLOCK: 'open',
        },
      },
      open: {
        id: 'open',
        on: {
          TOGGLE_CLOCK: 'close',
        },
        initial: 'idle',
        states: {
          idle: {
            on: {
              START: 'running',
            },
          },
          paused: {
            on: {
              TOGGLE_TIMER: 'running',
            },
          },
          running: {
            on: {
              TOGGLE_TIMER: 'paused',
            },
          },
          finish: {},
        },
      },
    },
  },
  {
    actions: {},
  },
);

export type ClockMachineType = typeof clockMachine;
