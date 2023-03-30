import { createMachine } from 'xstate';

export const copyMachine = createMachine({
  predictableActionArguments: true,
  preserveActionOrder: true,
  tsTypes: {} as import('./copyMachine.typegen').Typegen0,
  schema: {
    events: {} as { type: 'COPY'; code: string },
  },
  initial: `notCopied`,
  states: {
    notCopied: {
      on: {
        COPY: {
          target: `copied`,
          actions: [`copyCode`],
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
