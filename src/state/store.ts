import { createStore } from 'easy-peasy';

import ui, { UIStore } from './stores/ui';
import guild, { GuildStore } from './stores/guild';
import user, { UserStore } from './stores/user';

export interface RootStore {
  ui: UIStore;
  guild: GuildStore;
  user: UserStore;
}

const state: RootStore = {
  ui,
  guild,
  user
};

export const store = createStore(state);
