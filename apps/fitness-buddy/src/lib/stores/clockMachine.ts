import { browser } from '$app/env';
import { audioActions } from '$lib/stores/audio';
import { createMachine, assign } from 'xstate';

type CreateClockMachineProps = {
  exerciseId: string;
  totalSeries: number;
  remainingSeries?: number;
  totalRest: number;
  remainingRest?: number;
  canRewind: boolean;
  canFastForward: boolean;
};

type ClockContextWithState = CreateClockMachineProps & {
  state: ClockMachineState;
};

export type ClockMachineState = 'idle' | 'running' | 'pause';

export function createClockMachine({
  exerciseId,
  totalRest,
  totalSeries,
  remainingRest,
  remainingSeries,
}: Omit<CreateClockMachineProps, 'canFastForward' | 'canRewind'>) {
  const persistedStore = readTrainingStore() || {};

  const persistedContext = persistedStore[exerciseId] || {
    exerciseId,
    totalRest,
    totalSeries,
    remainingRest: remainingRest || totalRest,
    remainingSeries: remainingSeries || 1,
    state: 'idle',
    canFastForward: false,
    canRewind: false,
  };

  const clockMachine = createMachine(
    {
      schema: {
        context: {} as CreateClockMachineProps,
        events: {} as
          | { type: 'TOGGLE' }
          | { type: 'FINISH' }
          | { type: 'REWIND' }
          | { type: 'FAST_FORWARD' }
          | { type: 'TICK' },
      },
      id: 'clock',
      context: persistedContext,
      initial: persistedContext.state,
      states: {
        idle: {
          entry: ['allowMoveSeries'],
          on: {
            TOGGLE: {
              target: 'running',
              actions: ['startClock'],
            },
            FAST_FORWARD: {
              target: 'idle',
              actions: ['fastForward'],
              cond: 'canFastForward',
            },
            REWIND: {
              target: 'idle',
              actions: ['rewind'],
              cond: 'canRewind',
            },
          },
        },
        running: {
          invoke: {
            src: () => (cb) => {
              const intervalId = setInterval(() => {
                cb({ type: 'TICK' });
              }, 1000);

              return () => {
                clearInterval(intervalId);
              };
            },
          },
          exit: ['startNextSession'],
          on: {
            '': {
              target: 'idle',
              cond: (context) => {
                return context.remainingRest < 0;
              },
            },
            TOGGLE: {
              target: 'pause',
              actions: ['pauseClock'],
            },
            TICK: {
              actions: ['tick'],
            },
            FINISH: 'idle',
          },
        },
        pause: {
          on: {
            TOGGLE: 'running',
          },
        },
      },
    },
    {
      actions: {
        startClock(context) {
          return context;
        },
        pauseClock(context, event) {
          console.log({ context, event });
        },
        tick: assign({
          remainingRest: (context) => context.remainingRest - 1,
        }),
        startNextSession: assign((context, event) => {
          if (event.type === '') {
            audioActions.beep();
            return {
              remainingSeries: context.remainingSeries + 1,
              remainingRest: context.totalRest,
            };
          }
          return context;
        }),
        fastForward: assign({
          remainingSeries: (context) => context.remainingSeries + 1,
        }),
        rewind: assign({
          remainingSeries: (context) => context.remainingSeries - 1,
        }),
      },
      guards: {
        canFastForward,
        canRewind,
      },
    },
  );

  return clockMachine;
}

export function canFastForward(context: CreateClockMachineProps) {
  return context.remainingSeries < context.totalSeries;
}

export function canRewind(context: CreateClockMachineProps) {
  return context.remainingSeries > 1;
}

export function persistClockInfo(context: ClockContextWithState): void {
  if (browser) {
    const nextSavedState = readTrainingStore() ?? {};

    if (nextSavedState) {
      nextSavedState[context.exerciseId] = context;
    }

    localStorage.setItem(
      'activityStore_clock_2',
      JSON.stringify(nextSavedState),
    );
  }
}

function readTrainingStore(): {
  [key: string]: CreateClockMachineProps & {
    state: ClockMachineState;
  };
} | null {
  if (browser) {
    const state = localStorage.getItem('activityStore_clock_2');
    if (state) {
      return JSON.parse(state);
    }
    return null;
  }
}

export function continueTimer(context: ClockContextWithState) {
  const nextContext = { ...context };

  const intervalID = setInterval(() => {
    if (nextContext.remainingRest >= 0) {
      nextContext.remainingRest--;
    } else {
      nextContext.remainingSeries++;
      nextContext.remainingRest = nextContext.totalRest;
      nextContext.state = 'idle';
      clearInterval(intervalID);
      audioActions.beep();
    }

    persistClockInfo(nextContext);
  }, 1000);
}
