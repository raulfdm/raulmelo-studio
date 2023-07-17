import dayjs from 'dayjs';
import { assign, createMachine } from 'xstate';

type Context = {
  date: string | undefined;
  nextDate: string | undefined;
  daysToSubtract: number | undefined;
  weeksToSubtract: number | undefined;
  monthsToSubtract: number | undefined;
};

export type SubtractDateInputTypes = 'day' | 'weeks' | 'month';

type Events =
  | {
      type: 'CHANGE_DATE';
      value: string | undefined;
    }
  | {
      type: 'CHANGE';
      value: number | undefined;
    }
  | {
      type: 'FOCUS_DAY';
    }
  | {
      type: 'FOCUS_WEEKS';
    }
  | {
      type: 'FOCUS_MONTH';
    };

export const subtractDateMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    initial: 'day',
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    tsTypes: {} as import('./subtractDate.typegen').Typegen0,
    context: {
      date: dayjs(new Date()).format('YYYY-MM-DD'),
      nextDate: undefined,
      daysToSubtract: undefined,
      weeksToSubtract: undefined,
      monthsToSubtract: undefined,
    },
    on: {
      FOCUS_DAY: {
        target: 'day',
      },
      FOCUS_WEEKS: {
        target: 'weeks',
      },
      FOCUS_MONTH: {
        target: 'month',
      },
    },
    states: {
      day: {
        entry: ['calculateDays'],
        on: {
          CHANGE_DATE: {
            actions: ['changeDate', 'calculateDays'],
          },
          CHANGE: {
            actions: ['setDay', 'calculateDays'],
          },
        },
      },
      weeks: {
        entry: ['calculateWeeks'],
        on: {
          CHANGE_DATE: {
            actions: ['changeDate', 'calculateWeeks'],
          },
          CHANGE: {
            actions: ['setWeeks', 'calculateWeeks'],
          },
        },
      },
      month: {
        entry: ['calculateMonths'],
        on: {
          CHANGE_DATE: {
            actions: ['changeDate', 'calculateMonths'],
          },
          CHANGE: {
            actions: ['setMonth', 'calculateMonths'],
          },
        },
      },
    },
  },
  {
    actions: {
      changeDate: assign({
        date: (_, event) => event.value,
      }),
      setDay: assign({
        daysToSubtract: (_, event) => event.value,
      }),
      calculateDays: assign({
        nextDate: (context) => {
          if (context.daysToSubtract) {
            return dayjs(context.date)
              .subtract(context.daysToSubtract, 'd')
              .format('DD/MM/YYYY');
          }

          return undefined;
        },
      }),
      setWeeks: assign({
        weeksToSubtract: (_, event) => event.value,
      }),
      calculateWeeks: assign({
        nextDate: (context) => {
          if (context.weeksToSubtract) {
            return dayjs(context.date)
              .subtract(context.weeksToSubtract, 'w')
              .format('DD/MM/YYYY');
          }

          return undefined;
        },
      }),
      setMonth: assign({
        monthsToSubtract: (_, event) => event.value,
      }),
      calculateMonths: assign({
        nextDate: (context) => {
          if (context.monthsToSubtract) {
            return dayjs(context.date)
              .subtract(context.monthsToSubtract, 'M')
              .format('DD/MM/YYYY');
          }

          return undefined;
        },
      }),
    },
  },
);
