import { createMachine } from '@xstate/fsm';
import { useMachine } from '@xstate/react/lib/fsm';

type CloseMenuEvent = { type: 'CLOSE' };
type ToggleMenuEvent = { type: 'TOGGLE' };

type MachineEvents = ToggleMenuEvent | CloseMenuEvent;

const sideMenuMachine = createMachine<never, MachineEvents>({
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
    state: current.value as 'closed' | 'open',
    isClosed: current.value === 'closed',
    toggle: () => send('TOGGLE'),
    handleClose,
  };
}

export type UseSideMenu = {
  toggle: () => void;
  handleClose: () => void;
  isClosed: boolean;
  state: 'open' | 'closed';
};
