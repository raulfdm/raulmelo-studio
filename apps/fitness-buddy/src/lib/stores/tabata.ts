import { assign, createMachine } from 'xstate';
import cloneDeep from 'lodash.clonedeep';
import { v4 as uuid } from 'uuid';

export type TabataClockContext = {
  prepare: number;
  cycles: number;
  workout: [id: string, time: number][];
  rest: number;
  cooldown: number;
};

type TabataClockEvents =
  | {
      type: 'ADD_NEW_WORKOUT';
    }
  | {
      type: 'REMOVE_WORKOUT';
      workoutId: string;
    }
  | {
      type: 'CHANGE_WORKOUT';
      payload: {
        workoutId: string;
        value: number;
      };
    }
  | {
      type: 'CHANGE_REST';
      payload: {
        rest: number;
      };
    }
  | {
      type: 'CHANGE_PREPARE';
      payload: {
        prepare: number;
      };
    }
  | {
      type: 'CHANGE_COOLDOWN';
      payload: {
        cooldown: number;
      };
    }
  | {
      type: 'CHANGE_CYCLES';
      payload: {
        cycles: number;
      };
    }
  | {
      type: 'FULL_CONFIG';
      payload: TabataClockContext;
    };

export const tabataMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    initial: 'configuring',
    schema: {
      context: {} as TabataClockContext,
      events: {} as TabataClockEvents,
    },
    tsTypes: {} as import('./tabata.typegen').Typegen0,
    context: {
      prepare: 0,
      cycles: 1,
      workout: [],
      rest: 0,
      cooldown: 0,
    },
    states: {
      configuring: {
        on: {
          FULL_CONFIG: {
            actions: 'setConfig',
          },
          ADD_NEW_WORKOUT: {
            actions: ['addNewWorkout'],
          },
          REMOVE_WORKOUT: {
            actions: ['removeWorkout'],
          },
          CHANGE_WORKOUT: {
            actions: ['changeWorkout'],
          },
          CHANGE_COOLDOWN: {
            actions: ['changeCooldown'],
          },
          CHANGE_CYCLES: {
            actions: ['changeCycles'],
          },
          CHANGE_PREPARE: {
            actions: ['changePrepare'],
          },
          CHANGE_REST: {
            actions: ['changeRest'],
          },
        },
      },
      action: {},
    },
  },
  {
    actions: {
      setConfig: assign((_, event) => event.payload),
      addNewWorkout: assign({
        workout: (context) => {
          return [...context.workout, [uuid(), 0] as [string, number]];
        },
      }),
      removeWorkout: assign({
        workout: (context, event) => {
          return context.workout.filter(([id]) => id !== event.workoutId);
        },
      }),
      changeWorkout: assign({
        workout: (context, { payload: { value, workoutId } }) => {
          const nextWorkouts = cloneDeep(context.workout);

          for (const element of nextWorkouts) {
            const [id] = element;

            if (id === workoutId) {
              element[1] = value;
              break;
            }
          }

          return nextWorkouts;
        },
      }),
      changeCooldown: assign({
        cooldown: (_, { payload: { cooldown } }) => cooldown,
      }),
      changeCycles: assign({
        cycles: (_, { payload: { cycles } }) => cycles,
      }),
      changePrepare: assign({
        prepare: (_, { payload: { prepare } }) => prepare,
      }),
      changeRest: assign({
        rest: (_, { payload: { rest } }) => rest,
      }),
    },
  },
);
