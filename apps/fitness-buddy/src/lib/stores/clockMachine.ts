import { browser } from '$app/env';
import { audioActions } from '$lib/stores/audio';
import { useMachine } from '@xstate/svelte';
import { createMachine, assign } from 'xstate';

type CreateClockMachineProps = {
  exerciseId: string;
  totalSeries: number;
  remainingSeries?: number;
  totalRest: number;
  remainingRest?: number;
};

type ClockContextWithState = CreateClockMachineProps & {
  state: ClockMachineState;
};

export type ClockMachineState = 'idle' | 'running' | 'pause';

const clockMachine = createMachine(
  {
    tsTypes: {} as import('./clockMachine.typegen').Typegen0,
    schema: {
      context: {} as CreateClockMachineProps,
      events: {} as
        | {
            type: 'SET_ACTIVITY';
            payload: {
              exerciseId: string;
              totalSeries: number;
              totalRest: number;
            };
          }
        | { type: 'TOGGLE' }
        | { type: 'FINISH' }
        | { type: 'REWIND' }
        | { type: 'FAST_FORWARD' }
        | { type: 'TICK' },
    },
    id: 'clock',
    context: {
      remainingSeries: 0,
      remainingRest: 0,
      totalSeries: 0,
      totalRest: 0,
      exerciseId: null,
    },
    initial: 'unset',
    states: {
      unset: {
        on: {
          SET_ACTIVITY: {
            target: 'idle',
            actions: ['setActivity'],
          },
        },
      },
      idle: {
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
        always: [
          {
            target: 'idle',
            cond: (context) => {
              return context.remainingRest < 0;
            },
          },
        ],
        on: {
          TOGGLE: {
            target: 'pause',
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
      setActivity: assign((_, { payload }) => {
        const persistedStore = readTrainingStore() || {};

        const persistedContext = persistedStore[payload.exerciseId] ?? {
          exerciseId: payload.exerciseId,
          totalRest: payload.totalRest,
          totalSeries: payload.totalSeries,
          remainingRest: payload.totalRest,
          remainingSeries: 1,
          canFastForward: false,
          canRewind: false,
        };

        return persistedContext;
      }),
      startClock(context) {
        return context;
      },

      tick: assign({
        remainingRest: (context) => context.remainingRest - 1,
      }),
      startNextSession: assign((context, event) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const clockMachineService = useMachine(clockMachine);

clockMachineService.service.start();

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
