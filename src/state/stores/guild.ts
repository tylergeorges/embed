import { Action, Computed, action, computed } from 'easy-peasy';
import { Category, Channel, GuildSettings } from '@graphql/graphql';

export interface IGuild {
  id: string;
  name: string;
}

export interface IThread extends Channel {
  id: string;
  name: string;
  __typename: 'ThreadChannel';
}

export type ChannelThreads = {
  [channelId: string]: {
    threads: Channel[];
  };
};
// export type GuildThreads = Record<string, ChannelThreads>;

export interface GuildStore {
  channelThreads: Computed<GuildStore, ChannelThreads>;
  currentThread: Channel | undefined;
  data?: IGuild;
  settings?: GuildSettings;
  channels?: Channel[];
  categories: Computed<GuildStore, Category[]>;
  setData: Action<GuildStore, IGuild>;
  setSettings: Action<GuildStore, GuildSettings>;
  setChannels: Action<GuildStore, Channel[]>;
  setCurrentThread: Action<GuildStore, Channel>;
}

const guild: GuildStore = {
  // State
  data: undefined,
  settings: undefined,
  channels: undefined,
  currentThread: undefined,
  channelThreads: computed(state => {
    if (!state.channels) return {};

    const channelThreads: ChannelThreads = {};

    // Filter for channels that have threads
    const channelsWithThreads = state.channels.filter(
      channel => channel.threads && channel.threads?.length > 0
    );

    // Iterate over channels that have threads and add them to map
    for (let i = 0; i < channelsWithThreads.length; i += 1) {
      const channel = channelsWithThreads[i];

      const mapHasChannel = channelThreads[channel.id];
      if (mapHasChannel) break;

      channelThreads[channel.id] = { threads: [] };

      channelThreads[channel.id].threads = channel.threads as Channel[];
    }

    return channelThreads;
  }),

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
  }),
  setCurrentThread: action((state, payload) => {
    state.currentThread = payload;
  })
};

export default guild;
