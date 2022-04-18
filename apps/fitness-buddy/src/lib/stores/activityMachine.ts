import { useMachine } from '@xstate/svelte';
import { assign, createMachine, spawn, type InterpreterFrom } from 'xstate';

import type { ITraining } from '$lib/api';
import { clockMachine } from './clockMachine';

export type ITab = 'clock' | 'content' | 'drop-set-calculator';

const activityMachineModel = createMachine(
  {
    tsTypes: {} as import('./activityMachine.typegen').Typegen0,
    schema: {
      context: {} as {
        currentTabOpened: ITab;
        trainings: { [key: string]: ITraining };
        training: InterpreterFrom<typeof clockMachine> | null;
      },
      events: {} as
        | {
            type: 'CHANGE_TAB';
            payload: {
              tab: ITab;
            };
          }
        | {
            type: 'OPEN';
            payload: {
              trainingId: string;
            };
          }
        | {
            type: 'CLOSE';
          },
    },
    context: {
      currentTabOpened: 'clock',
      trainings: {},
      training: null,
    },
    initial: 'inactive',
    states: {
      inactive: {
        on: {
          OPEN: {
            target: 'active',
            actions: ['openTraining'],
          },
        },
      },
      active: {
        on: {
          CLOSE: 'inactive',
          CHANGE_TAB: {
            actions: ['setCurrentTab'],
          },
        },
      },
    },
  },
  {
    actions: {
      setCurrentTab: assign({
        currentTabOpened: (_, event) => event.payload.tab,
      }),
      openTraining: assign((context, event) => {
        const training = context.trainings[event.payload.trainingId];

        if (training) {
          return {
            ...context,
            training,
          };
        }

        const bar = spawn(clockMachine);

        console.log(bar.getSnapshot());

        return {
          ...context,
          training: bar,
          trainings: {
            ...context.trainings,
            [event.payload.trainingId]: bar,
          },
        };
      }),
    },
  },
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const activityMachine = useMachine(activityMachineModel);
