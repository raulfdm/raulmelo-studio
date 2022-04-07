import type { ITraining } from '$lib/api';
import { writable } from 'svelte/store';

export type ITab = 'clock' | 'clockConfig' | 'content';

type Store = {
  state: 'open' | 'closed';
  trainingList: Map<string, ITraining>;
  currentTraining: ITraining | null;
  currentTabActive: ITab;
};

export const activityStore = writable<Store>({
  state: 'closed',
  currentTraining: null,
  trainingList: new Map(),
  currentTabActive: 'clock',
});

export const activityActions = {
  addTraining: (training: ITraining) => {
    activityStore.update((store) => {
      store.trainingList.set(training._key, training);
      return store;
    });
  },

  open(trainingKey: string) {
    activityStore.update((store) => {
      const currentTrainingOpen = store.trainingList.get(trainingKey);

      return { ...store, state: 'open', currentTraining: currentTrainingOpen };
    });
  },
  close() {
    activityStore.update((store) => ({ ...store, state: 'closed' }));
  },

  setCurrentTab(tab: ITab) {
    activityStore.update((store) => ({ ...store, currentTabActive: tab }));
  },
};
