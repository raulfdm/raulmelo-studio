import dayjs, { type Dayjs } from 'dayjs';
import { assign, createMachine } from 'xstate';

type HourMachineContext = {
  baseTime: Date;
  hours: number;
  minutes: number;
  seconds: number;
  type: 'add' | 'subtract';
  result: string;
};

type TimeMachineEvents =
  | {
      type: 'TIME_CHANGE';
      payload: string;
    }
  | {
      type: 'TIME_TO_CHANGE';
      payload: {
        fieldType: 'hours' | 'minutes' | 'seconds';
        value: number;
      };
    }
  | {
      type: 'TYPE_CHANGE';

      payload: {
        type: HourMachineContext['type'];
      };
    };

export const timeMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    initial: 'start',
    context: {
      baseTime: new Date(),
      hours: 0,
      minutes: 0,
      seconds: 0,
      type: 'add',
      result: '',
    },
    schema: {
      context: {} as HourMachineContext,
      events: {} as TimeMachineEvents,
    },
    tsTypes: {} as import('./time.typegen').Typegen0,
    states: {
      start: {
        on: {
          TIME_CHANGE: {
            actions: ['setBaseTime', 'updateResult'],
          },
          TIME_TO_CHANGE: {
            actions: ['setTimeTo', 'updateResult'],
            cond: (context, { payload }) =>
              isNaN(payload.value) || payload.value > 0,
          },
          TYPE_CHANGE: {
            actions: ['setType', 'updateResult'],
          },
        },
      },
    },
  },
  {
    actions: {
      setBaseTime: assign({
        baseTime: (context, { payload }) => {
          if (payload === '') {
            return new Date();
          }
          const [hours, minutes, seconds] = payload.split(':');

          return dayjs(new Date(context.baseTime))
            .set('h', parseInt(hours))
            .set('m', parseInt(minutes))
            .set('s', parseInt(seconds))
            .toDate();
        },
      }),
      setTimeTo: assign((context, { payload }) => {
        return {
          ...context,
          [payload.fieldType]: isNaN(payload.value) ? 0 : payload.value,
        };
      }),
      setType: assign({
        type: (_, event) => event.payload.type,
      }),
      updateResult: assign({
        result: (context) => {
          const { hours, minutes, seconds, type, baseTime } = context;
          const dayjsTime = dayjs(baseTime);

          if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
            /* eslint-disable no-unexpected-multiline  */
            const result = dayjsTime[type](hours, 'h')
              [type](minutes, 'm')
              [type](seconds, 's');
            /* eslint-enable no-unexpected-multiline */

            return isAnotherDay(dayjsTime, result)
              ? result.format('HH:mm:ss ____ DD/MM/YYYY')
              : result.format('HH:mm:ss');
          } else {
            return context.result;
          }
        },
      }),
    },
  },
);

function isAnotherDay(prev: Dayjs, next: Dayjs) {
  return prev.format('DD') !== next.format('DD');
}
