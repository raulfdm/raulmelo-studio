import type { ITraining } from '$lib/api';
import { writable } from 'svelte/store';

export type ITab = 'clock' | 'clockConfig' | 'content' | 'drop-set-calculator';

type TrainingWithClock = ITraining;

type Store = {
  state: 'open' | 'closed';
  trainingList: Map<string, TrainingWithClock>;
  currentTraining: TrainingWithClock | null;
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

      return {
        ...store,
        state: 'open',
        currentTraining: currentTrainingOpen,
      };
    });
  },
  close() {
    activityStore.update((store) => ({ ...store, state: 'closed' }));
  },
  setCurrentTab(tab: ITab) {
    activityStore.update((store) => ({ ...store, currentTabActive: tab }));
  },
  onRestTimeChange(restTime: number) {
    activityStore.update((store) => {
      const { totalRest: currentRest, remainingTime } =
        store.currentTraining.clock;

      store.currentTraining.clock.totalRest = restTime;

      if (currentRest === remainingTime) {
        store.currentTraining.clock.remainingTime = restTime;
      }

      return store;
    });
  },
  resetTimer() {
    activityStore.update((store) => {
      if (store.currentTraining.clock.intervalId !== null) {
        clearInterval(store.currentTraining.clock.intervalId);
        store.currentTraining.clock.intervalId = null;
      }

      store.currentTraining.clock.seriesDone = 1;
      store.currentTraining.clock.remainingTime =
        store.currentTraining.clock.totalRest;

      return store;
    });
  },
};
