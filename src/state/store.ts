import { createStore } from 'easy-peasy';

import user, { UserStore } from './stores/user';
import ui, { UIStore } from './stores/ui';

export interface RootStore {
  user: UserStore;
  ui: UIStore;
}

const state: RootStore = {
  user,
  ui
};

export const store = createStore(state);
