import { assign, createMachine } from 'xstate';

export type RuleOfThreeMode = 'zCalculation' | 'yCalculation';

type RuleOfThreeContext = {
  x: number | null;
  y: number | null;
  z: number | null;
  mode: RuleOfThreeMode;
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
    }
  | {
      type: 'CHANGE_MODE';
      payload: RuleOfThreeContext['mode'];
    };

export const ruleOfThreeMachine = createMachine(
  {
    predictableActionArguments: true,
    id: 'ruleOfThree',
    initial: 'prepare',
    context: {
      x: null,
      y: null,
      z: null,
      mode: 'zCalculation',
    },
    schema: {
      context: {} as RuleOfThreeContext,
      events: {} as RuleOfThreeEvents,
    },
    tsTypes: {} as import('./ruleOfThree.typegen').Typegen0,
    on: {
      SET_X: {
        actions: ['setX'],
        target: 'calculate',
      },
      SET_Y: {
        actions: ['setY'],
        target: 'calculate',
      },
      SET_Z: {
        actions: ['setZ'],
        target: 'calculate',
      },
      CHANGE_MODE: {
        actions: ['changeMode'],
      },
    },
    states: {
      prepare: {},
      calculate: {
        always: [
          {
            target: 'calculateZ',
            cond: (context) =>
              isZCalculationMode(context) && canCalculateZ(context),
          },
          {
            target: 'calculateY',
            cond: (context) => canCalculateY(context),
          },
          {
            target: 'prepare',
          },
        ],
      },
      calculateZ: {
        always: {
          target: 'prepare',
          actions: ['calculateZ'],
        },
      },
      calculateY: {
        always: {
          target: 'prepare',
          actions: ['calculateY'],
        },
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
      changeMode: assign({
        mode: (_, event) => event.payload,
      }),
    },
  },
);

function isZCalculationMode(context: RuleOfThreeContext) {
  return context.mode === 'zCalculation';
}

function canCalculateY(context: RuleOfThreeContext) {
  return context.x !== null && context.x !== undefined;
}

function canCalculateZ(context: RuleOfThreeContext) {
  return (
    context.x !== null &&
    context.x !== undefined &&
    context.y !== null &&
    context.y !== undefined
  );
}
