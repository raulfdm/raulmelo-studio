import { createMachine, assign } from 'xstate';
import type { TabataConfigContext } from './tabata-config';

type TabataClockContext = {
  elapsed: number;
  currentAction: ActionItem;
  listOfActions: ActionItem[];
  _actionIndex: number;
};

type TabataClockEvents =
  | {
      type: 'TICK';
    }
  | {
      type: 'NEXT_ACTION';
    }
  | {
      type: 'TOGGLE';
    };

export function createTabataClock(tabataConfig: TabataConfigContext) {
  const list = getClockListOfActions(tabataConfig);

  return createMachine(
    {
      predictableActionArguments: true,
      preserveActionOrder: true,
      initial: 'idle',
      schema: {
        context: {} as TabataClockContext,
        events: {} as TabataClockEvents,
      },
      context: {
        elapsed: tabataConfig.prepare,
        _actionIndex: 0,
        currentAction: list[0],
        listOfActions: list,
      },
      on: {
        TICK: {
          actions: ['tickElapsed'],
        },
        NEXT_ACTION: {
          actions: ['nextAction'],
          target: 'decider',
        },
      },
      states: {
        idle: {
          on: {
            TOGGLE: 'running',
          },
        },
        decider: {
          always: [
            {
              target: 'finished',
              cond: 'hasFinished',
            },
            {
              target: 'running',
            },
          ],
        },
        paused: {
          on: {
            TOGGLE: 'running',
          },
        },
        running: {
          invoke: {
            src: 'tick',
          },
          on: {
            TOGGLE: 'paused',
          },
        },
        finished: {
          type: 'final',
        },
      },
    },
    {
      actions: {
        tickElapsed: assign({
          elapsed: (context) => context.elapsed - 1,
        }),
        nextAction: assign((context) => {
          const nextIndex = context._actionIndex + 1;
          const nextAction = context.listOfActions[nextIndex];

          const nextContext: TabataClockContext = {
            ...context,
            _actionIndex: nextIndex,
            currentAction: nextAction,
            elapsed: nextAction.duration,
          };

          return nextContext;
        }),
      },
      guards: {
        hasFinished: (context) =>
          context._actionIndex === context.listOfActions.length - 1,
      },
      services: {
        tick: (context) => (callback) => {
          let times = context.elapsed;
          const interval = setInterval(() => {
            if (--times < 0) {
              callback('NEXT_ACTION');
            } else {
              callback('TICK');
            }
          }, 1000);

          return () => {
            clearInterval(interval);
          };
        },
      },
    },
  );
}

type ActionItem = {
  type: 'prepare' | 'workout' | 'rest' | 'cooldown' | 'final';
  duration: number;
  label: string;
};

export function getClockListOfActions(
  tabataConfig: TabataConfigContext,
): ActionItem[] {
  const list: ActionItem[] = [
    { type: 'prepare', duration: tabataConfig.prepare, label: 'Prepare' },
  ];

  for (let cycle = tabataConfig.cycles; cycle > 0; cycle--) {
    tabataConfig.workout.forEach(([_, workout], index) => {
      list.push({
        type: 'workout',
        duration: workout,
        label: `Workout ${index + 1}`,
      });
    });

    list.push({
      type: 'rest',
      duration: tabataConfig.rest,
      label: 'Rest',
    });
  }

  if (tabataConfig.cooldown > 0) {
    list.push({
      type: 'cooldown',
      duration: tabataConfig.cooldown,
      label: 'Cooldown',
    });
  }

  list.push({
    type: 'final',
    duration: 0,
    label: 'Finished',
  });

  return list;
}
