import { browser } from '$app/env';
import type { ITraining } from '$lib/api';
import { writable, get } from 'svelte/store';

export type ITab = 'clock' | 'clockConfig' | 'content';

type Clock = {
  intervalId: NodeJS.Timer | null;
  seriesDone: number;
  totalSeries: number;
  totalRest: number;
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

activityStore.subscribe((value) => {
  const { currentTraining } = value;
  if (currentTraining) {
    const { state, intervalId } = currentTraining.clock;
    if (state !== 'running' && intervalId !== null) {
      clearInterval(intervalId);
    }
  }
});

export const activityActions = {
  addTraining: (training: ITraining) => {
    const defaultClock = {
      intervalId: null,
      seriesDone: 1,
      totalSeries: training.series,
      totalRest: training.restTime,
      remainingTime: training.restTime,
      state: 'idle',
      done: false,
    };

    const persistedClock = readClockFromLocalStorage(training._key);

    activityStore.update((store) => {
      store.trainingList.set(training._key, {
        ...training,
        clock: persistedClock ?? defaultClock,
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

    const { state } = store.currentTraining.clock;

    switch (state) {
      case 'idle': {
        activityStore.update((store) => {
          store.currentTraining.clock.state = 'running';

          runClock();
          return store;
        });
        break;
      }
      case 'pause': {
        activityStore.update((store) => {
          store.currentTraining.clock.state = 'running';

          runClock();
          return store;
        });
        break;
      }
      case 'running': {
        activityStore.update((store) => {
          clearInterval(store.currentTraining.clock.intervalId);
          store.currentTraining.clock.state = 'pause';

          return store;
        });
        break;
      }
      default: {
        throw new Error('Unknown state');
      }
    }

    function runClock() {
      let { intervalId } = store.currentTraining.clock;

      if (intervalId !== null) {
        clearInterval(intervalId);
      }

      intervalId = setInterval(run, 1000);

      function run() {
        activityStore.update((store) => {
          const currentClock = store.currentTraining.clock;

          currentClock.remainingTime -= 1;
          currentClock.intervalId = intervalId;

          if (currentClock.remainingTime < 0) {
            currentClock.state = 'idle';
            currentClock.remainingTime = store.currentTraining.clock.totalRest;
            currentClock.seriesDone += 1;
            clearInterval(intervalId);
            speakTimeIsOver();
          }

          return store;
        });
      }
    }
  },
  onSeriesChange(series: number) {
    activityStore.update((store) => {
      store.currentTraining.clock.totalSeries = series;

      return { ...store };
    });
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

function speakTimeIsOver() {
  const msg = new SpeechSynthesisUtterance();
  msg.text = 'Ae caralho, acabou o tempo!';
  msg.lang = 'pt-BR';

  window.speechSynthesis.speak(msg);

  let counter = 2;

  const id = setInterval(() => {
    window.speechSynthesis.speak(msg);

    if (--counter === 0) {
      clearInterval(id);
    }
  }, 2000);
}

activityStore.subscribe((store) => {
  if (store.currentTraining !== null) {
    persistStore(store.currentTraining._key, store.currentTraining.clock);
  }
});

function persistStore(trainingId: string, clock: Clock) {
  const store = get(activityStore);

  if (browser && store.currentTraining?.clock) {
    const nextSavedState = readTrainingStore() ?? {};

    if (nextSavedState) {
      nextSavedState[trainingId] = {
        ...clock,
        intervalId: null,
      };
    }

    localStorage.setItem('activityStore_clock', JSON.stringify(nextSavedState));
  }
}

function readClockFromLocalStorage(trainingId: string) {
  if (browser) {
    const state = readTrainingStore();
    if (state) {
      return state[trainingId] ?? null;
    }
    return null;
  }
}

function readTrainingStore() {
  if (browser) {
    const state = localStorage.getItem('activityStore_clock');
    if (state) {
      return JSON.parse(state);
    }
    return null;
  }
}
