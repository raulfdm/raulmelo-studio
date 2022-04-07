import type { ITraining } from '$lib/api';
import { writable, get } from 'svelte/store';

export type ITab = 'clock' | 'clockConfig' | 'content';

type Clock = {
  intervalId: number | null;
  seriesDone: number;
  remainingTime: number;
  state: 'idle' | 'pause' | 'running';
};

type Store = {
  state: 'open' | 'closed';
  trainingList: Map<string, ITraining & { clock: Clock }>;
  currentTraining: ITraining | null;
  currentTabActive: ITab;
  currentClock: Clock;
};

export const activityStore = writable<Store>({
  state: 'closed',
  currentTraining: null,
  currentClock: null,
  trainingList: new Map(),
  currentTabActive: 'clock',
});

export const activityActions = {
  addTraining: (training: ITraining) => {
    activityStore.update((store) => {
      store.trainingList.set(training._key, {
        ...training,
        clock: {
          intervalId: null,
          seriesDone: 1,
          remainingTime: training.restTime,
          state: 'idle',
        },
      });
      return store;
    });
  },

  open(trainingKey: string) {
    activityStore.update((store) => {
      const currentTrainingOpen = store.trainingList.get(trainingKey);
      const currentClock = currentTrainingOpen.clock;

      return {
        ...store,
        state: 'open',
        currentTraining: currentTrainingOpen,
        currentClock,
      };
    });
  },
  close() {
    activityStore.update((store) => ({ ...store, state: 'closed' }));
  },
  setCurrentTab(tab: ITab) {
    activityStore.update((store) => ({ ...store, currentTabActive: tab }));
  },
  startRunning() {
    //   activityStore.update((store) => {
    //     const currentStore = { ...store };
    //     return { ...store };
    //   });
  },
  pause() {
    // const currentTrainingClock = activityActions.getCurrentTrainingClock();
    // activityStore.update((store) => {
    //   currentTrainingClock.state = 'pause';
    //   return { ...store, currentClock: currentTrainingClock };
    // });
  },
};
