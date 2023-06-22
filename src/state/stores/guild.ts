import { Action, Computed, action, computed } from 'easy-peasy';
import { Category, Channel, GuildSettings } from '@graphql/graphql';
import { positionChannel } from '@util/positionChannel';

export interface IGuild {
  id: string;
  name: string;
}

export interface IThread extends Channel {
  id: string;
  name: string;
  __typename: 'ThreadChannel';
}

export type GuildChannels = {
  [channelId: string]: {
    threads: Channel[];
    channelName: string;
    channelTopic: string;
  };
};
// export type GuildThreads = Record<string, ChannelThreads>;

export interface GuildStore {
  guildChannels: Computed<GuildStore, GuildChannels>;
  data?: IGuild;
  settings?: GuildSettings;
  channels?: Channel[];
  categories: Computed<GuildStore, Category[]>;
  currentThread: Channel | undefined;
  currentChannel: { name: string; topic: string } | undefined;

  setData: Action<GuildStore, IGuild>;
  setSettings: Action<GuildStore, GuildSettings>;
  setChannels: Action<GuildStore, Channel[]>;
  setCurrentThread: Action<GuildStore, Channel>;
  setCurrentChannel: Action<GuildStore, string>;
}

const guild: GuildStore = {
  // State
  data: undefined,
  settings: undefined,
  channels: undefined,
  currentThread: undefined,
  currentChannel: undefined,

  guildChannels: computed(state => {
    if (!state.channels) return {};

    const guildChannels: GuildChannels = {};

    // Filter for channels that have threads
    // const channelsWithThreads = state.channels.filter(channel => channel.threads && channel.threads?.length > 0);
    // const channelsWithThreads = state.channels.filter(channel => channel.threads && channel.threads?.length > 0);
    const channelsLen = state.channels.length;
    // Iterate over channels that have threads and add them to map
    for (let i = 0; i < channelsLen; i += 1) {
      const channel = state.channels[i];

      const mapHasChannel = guildChannels[channel.id];
      if (mapHasChannel) break;

      guildChannels[channel.id] = { threads: [], channelName: channel.name, channelTopic: channel.topic };
      guildChannels[channel.id].threads = channel.threads as Channel[];
    }

    return guildChannels;
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
    const sortedChannels = payload.sort((a, b) => positionChannel(a) - positionChannel(b));
    state.channels = sortedChannels;
  }),
  setCurrentThread: action((state, payload) => {
    state.currentThread = payload;
  }),
  setCurrentChannel: action((state, payload) => {
    const currentChannel = state.guildChannels[payload];
    state.currentChannel = { name: currentChannel.channelName, topic: currentChannel.channelTopic };
  })
};

export default guild;
