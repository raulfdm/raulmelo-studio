import { createMachine, assign } from 'xstate';

type ClockMachineContext = {
  ongoing: number;
  repetitionsComplete: number;
};

type ClockMachineEvents =
  | {
      type: 'TICK';
    }
  | {
      type: 'TOGGLE';
    };

type ClockProps = {
  restTimeInSeconds: number;
};

export function createClockExerciseMachine({ restTimeInSeconds }: ClockProps) {
  return createMachine(
    {
      id: 'clock',
      initial: 'idle',
      context: {
        ongoing: restTimeInSeconds,
        repetitionsComplete: 1,
      },
      schema: {
        context: {} as ClockMachineContext,
        events: {} as ClockMachineEvents,
      },
      tsTypes: {} as import('./clockExerciseMachine.typegen').Typegen0,
      states: {
        idle: {
          on: {
            TOGGLE: 'running',
          },
        },
        running: {
          invoke: {
            src: () => (sender) => {
              const interval = setInterval(() => {
                sender('TICK');
              }, 1000);

              return () => {
                clearInterval(interval);
              };
            },
          },
          always: {
            target: 'finished',
            cond: (context) => context.ongoing === 0,
          },
          on: {
            TICK: {
              actions: ['decreaseOngoing'],
            },
            TOGGLE: 'paused',
          },
        },
        paused: {
          on: {
            TOGGLE: 'running',
          },
        },
        finished: {
          entry: ['decreaseRepetitions', 'resetTimer'],
          always: {
            target: 'idle',
          },
        },
      },
    },
    {
      actions: {
        resetTimer: assign({
          ongoing: () => restTimeInSeconds,
        }),
        decreaseOngoing: assign({
          ongoing: (context) => context.ongoing - 1,
        }),
        decreaseRepetitions: assign({
          repetitionsComplete: (context) => context.repetitionsComplete + 1,
        }),
      },
    },
  );
}
