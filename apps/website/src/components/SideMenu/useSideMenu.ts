import { useMachine } from '@xstate/react';
import { createMachine } from 'xstate';

type CloseMenuEvent = { type: 'CLOSE' };
type ToggleMenuEvent = { type: 'TOGGLE' };

type MachineEvents = ToggleMenuEvent | CloseMenuEvent;

type MachineStates = 'open' | 'closed';

const sideMenuMachine = createMachine({
  predictableActionArguments: true,
  tsTypes: {} as import('./useSideMenu.typegen').Typegen0,
  schema: {
    actions: {} as MachineEvents,
  },
  initial: 'closed',
  states: {
    open: {
      on: {
        TOGGLE: 'closed',
        CLOSE: 'closed',
      },
    },
    closed: {
      on: {
        TOGGLE: 'open',
      },
    },
  },
});

export function useSideMenu(): UseSideMenu {
  const [current, send] = useMachine(sideMenuMachine);

  function handleClose() {
    send('CLOSE');
  }

  return {
    state: current.value as MachineStates,
    isClosed: current.value === 'closed',
    toggle: () => send('TOGGLE'),
    handleClose,
  };
}

export type UseSideMenu = {
  toggle: () => void;
  handleClose: () => void;
  isClosed: boolean;
  state: MachineStates;
};
