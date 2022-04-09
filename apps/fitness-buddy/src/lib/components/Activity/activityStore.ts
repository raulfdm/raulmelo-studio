import type { ITraining } from '$lib/api';
import { writable, get } from 'svelte/store';

export type ITab = 'clock' | 'clockConfig' | 'content';

type Clock = {
  intervalId: NodeJS.Timer | null;
  seriesDone: number;
  totalSeries: number;
  remainingTime: number;
  state: 'idle' | 'pause' | 'running';
  done: boolean;
};

type TrainingWithClock = ITraining & { clock: Clock };

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
      store.trainingList.set(training._key, {
        ...training,
        clock: {
          intervalId: null,
          seriesDone: 1,
          totalSeries: parseInt(training.repetitions, 10),
          remainingTime: training.restTime,
          state: 'idle',
          done: false,
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
  toggleClock() {
    const store = get(activityStore);
    const currentClock = store.currentTraining.clock;

    if (currentClock.state === 'idle') {
      activityStore.update((store) => {
        currentClock.state = 'running';
        return { ...store, currentClock };
      });

      const intervalId = setInterval(() => {
        activityStore.update((store) => {
          currentClock.remainingTime -= 1;
          currentClock.intervalId = intervalId;

          if (currentClock.remainingTime < 0) {
            currentClock.state = 'idle';
            currentClock.remainingTime = store.currentTraining.restTime;
            currentClock.seriesDone += 1;
            clearInterval(intervalId);
          }

          return { ...store, currentClock };
        });
      }, 1000);
    }
  },
  pause() {
    // const currentTrainingClock = activityActions.getCurrentTrainingClock();
    // activityStore.update((store) => {
    //   currentTrainingClock.state = 'pause';
    //   return { ...store, currentClock: currentTrainingClock };
    // });
  },
  onSeriesChange(series: number) {
    activityStore.update((store) => {
      store.currentTraining.clock.totalSeries = series;

      return { ...store };
    });
  },
};
