import { assertEvent, setup } from 'xstate';

export const copyMachine = setup({
  types: {
    events: {} as { type: 'COPY'; code: string },
  },
  actions: {
    onCodeCopy: ({ event }) => {
      assertEvent(event, 'COPY');
      navigator.clipboard.writeText(event.code);
    },
  },
}).createMachine({
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
