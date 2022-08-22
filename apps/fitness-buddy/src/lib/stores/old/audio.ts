import { writable } from 'svelte/store';

type AudioStates = 'idle' | 'beeping';

export const audioStore = writable<AudioStates>('idle');

export const audioActions = {
  beep: () => {
    audioStore.update(() => {
      return 'beeping';
    });
  },
  finish: () => {
    audioStore.update(() => {
      return 'idle';
    });
  },
};
