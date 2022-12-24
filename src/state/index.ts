import { createStore } from 'easy-peasy';
import user, { UserStore } from './user';

export interface RootStore {
  user: UserStore;
}

const state: RootStore = {
  user
};

export const store = createStore(state);
