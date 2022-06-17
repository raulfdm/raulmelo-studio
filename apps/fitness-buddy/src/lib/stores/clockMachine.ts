import { createMachine } from 'xstate';

type ClockMachineContext = {
  clockId: string;
  totalTime: number;
  timeLeft: number;
};
type ClockMachineEvents =
  | {
      type: 'TOGGLE_TIMER';
    }
  | {
      type: 'START';
    };

export function createClockMachine(
  context: Omit<ClockMachineContext, 'timeLeft'>,
) {
  return createMachine(
    {
      context: {
        timeLeft: 0,
        ...context,
      },
      tsTypes: {} as import('./clockMachine.typegen').Typegen0,
      schema: {
        context: {} as ClockMachineContext,
        events: {} as ClockMachineEvents,
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
    {
      actions: {},
    },
  );
}

export type ClockMachineType = ReturnType<typeof createClockMachine>;
