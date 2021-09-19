interface RootStoreState {
  sideMenu: ISideMenuState;
}

interface ISideMenuState {
  state: 'open' | 'closed';
}
