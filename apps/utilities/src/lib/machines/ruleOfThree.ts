import { createMachine, assign } from 'xstate';

type RuleOfThreeContext = {
  x: number | null;
  y: number | null;
  z: number | null;
};

type RuleOfThreeEvents =
  | {
      type: 'SET_X';
      payload: {
        value: string;
      };
    }
  | {
      type: 'SET_Y';
      payload: {
        value: string;
      };
    }
  | {
      type: 'SET_Z';
      payload: {
        value: string;
      };
    };

export const ruleOfThreeMachine = createMachine(
  {
    id: 'ruleOfThree',
    initial: 'prepare',
    context: {
      x: null,
      y: null,
      z: null,
    },
    schema: {
      context: {} as RuleOfThreeContext,
      events: {} as RuleOfThreeEvents,
    },
    tsTypes: {} as import('./ruleOfThree.typegen').Typegen0,
    on: {
      SET_X: {
        actions: ['setX'],
        target: 'calculateZ',
      },
      SET_Y: {
        actions: ['setY'],
        target: 'calculateZ',
      },
      SET_Z: {
        actions: ['setZ'],
        target: 'calculateY',
      },
    },
    states: {
      prepare: {},
      calculateZ: {
        always: [
          {
            target: 'prepare',
            actions: ['calculateZ'],
            cond: 'canCalculateZ',
          },
          {
            target: 'prepare',
          },
        ],
      },
      calculateY: {
        always: [
          {
            target: 'prepare',
            actions: ['calculateY'],
            cond: 'canCalculateY',
          },
          {
            target: 'prepare',
          },
        ],
      },
    },
  },
  {
    actions: {
      setX: assign({
        x: (_, event) => parseFloat(event.payload.value),
      }),
      setY: assign({
        y: (_, event) => parseFloat(event.payload.value),
      }),
      setZ: assign({
        z: (_, event) => parseFloat(event.payload.value),
      }),
      calculateZ: assign({
        z: (context) => {
          if (context.x !== null && context.y !== null) {
            const parsedX = context.x;
            const parsedY = context.y;

            return (parsedY * 100) / parsedX;
          }

          return context.z;
        },
      }),
      calculateY: assign({
        y: (context) => {
          if (context.x !== null && context.z !== null) {
            const parsedZ = context.z;
            const parsedX = context.x;

            return (parsedZ * parsedX) / 100;
          }

          return context.y;
        },
      }),
    },
    guards: {
      canCalculateY: (context) => {
        return context.x !== null && context.x !== undefined;
      },
      canCalculateZ: (context) => {
        return (
          context.x !== null &&
          context.x !== undefined &&
          context.y !== null &&
          context.y !== undefined
        );
      },
    },
  },
);
