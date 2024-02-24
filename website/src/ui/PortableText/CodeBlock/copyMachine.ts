import { createMachine } from 'xstate';

export const copyMachine = createMachine({
  types: {} as {
    events: { type: 'COPY'; code: string };
    actions: {
      type: 'onCodeCopy';
      code: string;
    };
  },
  initial: `notCopied`,
  states: {
    notCopied: {
      on: {
        COPY: {
          target: `copied`,
          actions: [`onCodeCopy`],
        },
      },
    },
    copied: {
      after: {
        2500: `notCopied`,
      },
    },
  },
});
