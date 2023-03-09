import { writable } from 'svelte/store';

const initialSideMenuState = false;

export const sideMenuStore = writable(initialSideMenuState);

export function toggleSideMenu() {
  sideMenuStore.update((value) => !value);
}

export function closeSideMenu() {
  sideMenuStore.set(false);
}
