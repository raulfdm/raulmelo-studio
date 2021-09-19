import { ActionTree, MutationTree } from 'vuex/types/index';

export const state = (): ISideMenuState => {
  return {
    state: 'closed',
  };
};

export const mutations: MutationTree<ISideMenuState> = {
  close(state): void {
    state.state = 'closed';
  },
  open(state): void {
    state.state = 'open';
  },
};

export const actions: ActionTree<ISideMenuState, RootStoreState> = {
  close: (context) => {
    context.commit('close');
  },
  open: (context) => {
    context.commit('open');
  },
  toggle(context) {
    if (context.state.state === 'closed') {
      context.commit('open');
    } else {
      context.commit('close');
    }
  },
};
