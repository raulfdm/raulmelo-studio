import { browser } from '$app/env';
import { audioActions } from '$lib/stores/audio';
import { useMachine } from '@xstate/svelte';
import { createMachine, assign } from 'xstate';

export type ClockMachineState = 'idle' | 'running' | 'pause';

export const trainingMachine = createMachine(
  {
    tsTypes: {} as import('./trainingMachine.typegen').Typegen0,
    schema: {
      context: {},
      events: {},
    },
    id: 'training',
    context: {},
    states: {},
  },
  {},
);

type ClockMachineContext = {};
type ClockMachineEvents = {};

const clockMachine = createMachine({
  tsTypes: {} as import('./trainingMachine.typegen').Typegen1,
  schema: {
    context: {} as ClockMachineContext,
    events: {} as ClockMachineEvents,
  },
});

// export function canFastForward(context: ClockMachineContext) {
//   return context.remainingSeries < context.totalSeries;
// }

// export function canRewind(context: ClockMachineContext) {
//   return context.remainingSeries > 1;
// }

// export function persistClockInfo(context: ClockMachineContext): void {
//   if (browser) {
//     const nextSavedState = readTrainingStore() ?? {};

//     if (nextSavedState) {
//       nextSavedState[context.exerciseId] = context;
//     }

//     localStorage.setItem(
//       'activityStore_clock_2',
//       JSON.stringify(nextSavedState),
//     );
//   }
// }

// export function readTrainingStore(): {
//   [key: string]: CreateClockMachineProps & {
//     state: ClockMachineState;
//   };
// } | null {
//   if (browser) {
//     const state = localStorage.getItem('activityStore_clock_2');
//     if (state) {
//       return JSON.parse(state);
//     }
//     return null;
//   }
// }

// export function continueTimer(context: ClockContextWithState) {
//   const nextContext = { ...context };

//   const intervalID = setInterval(() => {
//     if (nextContext.remainingRest >= 0) {
//       nextContext.remainingRest--;
//     } else {
//       nextContext.remainingSeries++;
//       nextContext.remainingRest = nextContext.totalRest;
//       nextContext.state = 'idle';
//       clearInterval(intervalID);
//       audioActions.beep();
//     }

//     persistClockInfo(nextContext);
//   }, 1000);
// }
