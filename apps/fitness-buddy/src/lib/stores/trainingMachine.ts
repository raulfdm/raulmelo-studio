import { browser } from '$app/env';
import type { ITrainingSheet } from '$lib/api';
import { inspect } from '@xstate/inspect';
import {
  createMachine,
  assign,
  spawn,
  type InterpreterFrom,
  interpret,
} from 'xstate';
import type { ClockMachineType } from './clockMachine';
// import { clockMachine } from './clockMachine';

export type ClockMachineState = 'idle' | 'running' | 'pause';

type TrainingMachineContext = {
  currentIndex: number | null;
  currentActiveTraining: ITrainingSheet['schema'][0] | null;
  trainingSheet: ITrainingSheet | null;
  clocks: {
    [key: string]: InterpreterFrom<ClockMachineType>;
  };
  currentClock: InterpreterFrom<ClockMachineType> | null;
};

type TrainingMachineEvents =
  | {
      type: 'INITIALIZE';
      payload: {
        currentActiveIndex: number;
        trainingSheet: ITrainingSheet;
      };
    }
  | {
      type: 'CHANGE_TRAINING';
      payload: {
        currentActiveIndex: number;
      };
    }
  | {
      type: 'OPEN_CLOCK';
    };

const trainingMachine = createMachine(
  {
    tsTypes: {} as import('./trainingMachine.typegen').Typegen0,
    schema: {
      context: {} as TrainingMachineContext,
      events: {} as TrainingMachineEvents,
    },
    id: 'trainingApp',
    context: {
      currentIndex: null,
      currentActiveTraining: null,
      trainingSheet: null,
      clocks: {},
      currentClock: null,
    },
    initial: 'uninitialized',
    states: {
      uninitialized: {
        on: {
          INITIALIZE: {
            target: 'initialized',
            actions: ['initializeTrainingMachine'],
          },
        },
      },
      initialized: {
        id: 'initialized',
        initial: 'idle',
        on: {
          CHANGE_TRAINING: {
            actions: ['changeTraining'],
          },
        },
        states: {
          idle: {
            on: {
              OPEN_CLOCK: {
                actions: ['selectClock'],
                target: 'clockOpened',
              },
            },
          },
          clockOpened: {},
        },
      },
    },
  },
  {
    actions: {
      initializeTrainingMachine: assign({
        currentActiveTraining: (_, event) => {
          console.log(event);
          return event.payload.trainingSheet.schema[
            event.payload.currentActiveIndex
          ];
        },
        trainingSheet: (_, event) => event.payload.trainingSheet,
        currentIndex: (_, event) => event.payload.currentActiveIndex,
      }),
      changeTraining: assign({
        currentActiveTraining: (context, event) =>
          context.trainingSheet.schema[event.payload.currentActiveIndex],
        currentIndex: (_, event) => event.payload.currentActiveIndex,
      }),
      selectClock: assign((context) => {
        const { currentActiveTraining, clocks } = context;

        let clock = clocks[currentActiveTraining._id];
        const nextClocks = { ...clocks };

        if (!clock) {
          // clock = spawn(clockMachine);
          nextClocks[currentActiveTraining._id] = clock;
        }

        return { ...context, clocks: nextClocks, currentClock: clock };
      }),
    },
  },
);

export const trainingService = interpret(trainingMachine, {
  devTools: true,
});

if (browser) {
  inspect({ iframe: false });
}

trainingService.start();
