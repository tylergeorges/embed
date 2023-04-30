import { createStore } from 'easy-peasy';
import { UiState, UserState } from '@state/types';
import user from './user';
import ui from './ui';

export interface RootStore {
  user: UserState.Store;
  ui: UiState.Store;
}

const state: RootStore = {
  user,
  ui
};

export const store = createStore(state);
