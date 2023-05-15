import { Action, Computed, action, computed } from 'easy-peasy';
import { Category, Channel, GuildSettings } from '@graphql/graphql';

export interface IGuild {
  id: string;
  name: string;
}

interface Thread {
  id: string;
  name: string;
  __typename: 'ThreadChannel';
}

export interface GuildStore {
  currentChannelThreads: Thread[] | undefined;
  data?: IGuild;
  settings?: GuildSettings;
  channels?: Channel[];
  categories: Computed<GuildStore, Category[]>;
  setData: Action<GuildStore, IGuild>;
  setSettings: Action<GuildStore, GuildSettings>;
  setChannels: Action<GuildStore, Channel[]>;
}

const guild: GuildStore = {
  // State
  data: undefined,
  settings: undefined,
  channels: undefined,
  currentChannelThreads: undefined,

  // Computed
  categories: computed(state => {
    if (!state.channels) return [];

    return [...new Map(state.channels.map(c => [c.category?.id, c.category])).values()].sort(
      (a, b) => (a?.position || 0) - (b?.position || 0) // we use || 0 in case position is undefined
    ) as Category[];
  }),

  // Actions
  setData: action((state, payload) => {
    state.data = payload;
  }),

  setSettings: action((state, payload) => {
    state.settings = payload;
  }),

  setChannels: action((state, payload) => {
    state.channels = payload;

    const threads = [];
    // const threads = payload.map(channel => channel?.threads)
    const channelsWithThreads = payload.filter(channel => channel.threads.length > 0);

    channelsWithThreads.forEach(channel => {
      channel.threads?.forEach(thread => {
        threads.push(thread);
      });
    });

    state.currentChannelThreads = threads;
  })
};

export default guild;
