import { useMachine } from '@xstate/react/lib/fsm';
import { createMachine } from '@xstate/fsm';

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

export function useSideMenu() {
  const [current, send] = useMachine(sideMenuMachine);

  return {
    currentState: current.value as 'closed' | 'open',
    isClosed: current.value === 'closed',
    toggle: () => send('TOGGLE'),
    hide: () => send('CLOSE'),
  };
}
