import type { ITraining } from '$lib/api';
import { writable } from 'svelte/store';

type Store = {
  state: 'open' | 'closed';
  trainingList: ITraining[];
  currentTraining: ITraining | null;
};

export const activityStore = writable<Store>({
  state: 'closed',
  currentTraining: null,
  trainingList: [],
});

export const activityActions = {
  addTraining: (training: ITraining) => {
    activityStore.update((store) => {
      store.trainingList.push(training);
      return store;
    });
  },

  open() {
    activityStore.update((store) => ({ ...store, state: 'open' }));
  },
  close() {
    activityStore.update((store) => ({ ...store, state: 'closed' }));
  },
};
