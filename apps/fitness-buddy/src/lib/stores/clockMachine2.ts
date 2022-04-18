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

export type ClockMachineState = 'idle' | 'running' | 'pause';

export const clockMachine = createMachine(
  {
    tsTypes: {} as import('./clockMachine2.typegen').Typegen0,
    schema: {
      context: {} as CreateClockMachineProps,
      events: {} as
        | { type: 'TOGGLE' }
        | { type: 'RUN' }
        | { type: 'FINISH' }
        | { type: 'RESET' }
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
    initial: 'idle',
    states: {
      idle: {
        on: {
          RUN: {
            target: 'running',
            actions: [],
          },
          TOGGLE: {
            target: 'running',
            actions: [],
          },
          FAST_FORWARD: {
            target: 'idle',
            actions: [],
            // cond: 'canFastForward',
          },
          REWIND: {
            target: 'idle',
            actions: [],
            // cond: 'canRewind',
          },
          RESET: {
            target: 'idle',
            actions: [],
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
        exit: [],
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
            actions: [],
          },
          FINISH: 'idle',
        },
      },
      pause: {
        on: {
          TOGGLE: 'running',
          RESET: {
            target: 'idle',
            actions: [],
          },
        },
      },
    },
  },
  {
    actions: {},
    guards: {},
  },
);
