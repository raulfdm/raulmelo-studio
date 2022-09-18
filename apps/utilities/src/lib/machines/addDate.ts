import { assign, createMachine } from 'xstate';
import dayjs from 'dayjs';

type Context = {
  date: string | undefined;
  nextDate: string | undefined;
  daysToAdd: number | undefined;
  weeksToAdd: number | undefined;
  monthsToAdd: number | undefined;
};

export type AddDateInputTypes = 'day' | 'weeks' | 'month';

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

export const addDateMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    initial: 'day',
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    tsTypes: {} as import('./addDate.typegen').Typegen0,
    context: {
      date: dayjs(new Date()).format('YYYY-MM-DD'),
      nextDate: undefined,
      daysToAdd: undefined,
      weeksToAdd: undefined,
      monthsToAdd: undefined,
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
        daysToAdd: (_, event) => event.value,
      }),
      calculateDays: assign({
        nextDate: (context) => {
          if (context.daysToAdd) {
            return dayjs(context.date)
              .add(context.daysToAdd, 'd')
              .format('DD/MM/YYYY');
          }

          return undefined;
        },
      }),
      setWeeks: assign({
        weeksToAdd: (_, event) => event.value,
      }),
      calculateWeeks: assign({
        nextDate: (context) => {
          if (context.weeksToAdd) {
            return dayjs(context.date)
              .add(context.weeksToAdd, 'w')
              .format('DD/MM/YYYY');
          }

          return undefined;
        },
      }),
      setMonth: assign({
        monthsToAdd: (_, event) => event.value,
      }),
      calculateMonths: assign({
        nextDate: (context) => {
          if (context.monthsToAdd) {
            return dayjs(context.date)
              .add(context.monthsToAdd, 'M')
              .format('DD/MM/YYYY');
          }

          return undefined;
        },
      }),
    },
  },
);
