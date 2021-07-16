import { writable, get } from 'svelte/store';

type States = 'closed' | 'open';

const initialState: States = 'closed';

function createSideMenuStore() {
  const writableStore = writable<States>(initialState);

  const { set, subscribe } = writableStore;

  const API = {
    subscribe,
    close() {
      set('closed');
    },
    open() {
      set('open');
    },
    toggle() {
      const nextAction = get(writableStore) === 'closed' ? API.open : API.close;
      nextAction();
    },
  };

  return API;
}

export const sideMenuStore = createSideMenuStore();
