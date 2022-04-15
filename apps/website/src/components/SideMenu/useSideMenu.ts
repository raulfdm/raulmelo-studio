import { createMachine, Typestate } from '@xstate/fsm';
import { useMachine } from '@xstate/react/fsm';

type CloseMenuEvent = { type: 'CLOSE' };
type ToggleMenuEvent = { type: 'TOGGLE' };

type MachineEvents = ToggleMenuEvent | CloseMenuEvent;

type MachineStates = 'open' | 'closed';

const sideMenuMachine = createMachine<
  any,
  MachineEvents,
  Typestate<{ value: MachineStates }>
>({
  initial: 'closed',
  context: {
    value: 'closed',
  },
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
