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
  [channelId: string]: Channel;
};

export interface GuildStore {
  guildChannels: Computed<GuildStore, GuildChannels>;
  data?: IGuild;
  settings?: GuildSettings;
  channels?: Channel[];
  categories: Computed<GuildStore, Category[]>;
  currentThread: Channel | undefined;
  currentChannel: { name: string; topic: string } | undefined;
  refetchGuild: boolean;

  setData: Action<GuildStore, IGuild>;
  setSettings: Action<GuildStore, GuildSettings>;
  setChannels: Action<GuildStore, Channel[]>;
  setCurrentThread: Action<GuildStore, Channel>;
  setCurrentChannel: Action<GuildStore, string>;
  setRefetchGuild: Action<GuildStore, boolean>;
}

const guild: GuildStore = {
  // State
  data: undefined,
  settings: undefined,
  channels: undefined,
  currentThread: undefined,
  currentChannel: undefined,
  refetchGuild: false,

  guildChannels: computed(state => {
    if (!state.channels) return {};

    const guildChannels: GuildChannels = {};

    // Filter for channels that have threads
    const channelsLen = state.channels.length;
    // Iterate over channels that have threads and add them to map
    for (let i = 0; i < channelsLen; i += 1) {
      // @ts-ignore
      const channel = state.channels[i];

      const mapHasChannel = guildChannels[String(channel.id)];
      if (mapHasChannel) break;

      guildChannels[String(channel.id)] = channel;
      guildChannels[String(channel.id)].threads = channel.threads;
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

  setRefetchGuild: action((state, payload) => {
    state.refetchGuild = payload;
  }),

  setChannels: action((state, payload) => {
    if (payload.length !== state.channels?.length) {
      const sortedChannels = payload.sort((a, b) => positionChannel(a) - positionChannel(b));

      state.channels = sortedChannels;
    }
  }),

  setCurrentThread: action((state, payload) => {
    state.currentThread = payload;
  }),

  setCurrentChannel: action((state, payload) => {
    const currentChannel = state.guildChannels[payload];
    // @ts-ignore
    state.currentChannel = { name: currentChannel.name, topic: currentChannel.topic };
  })
};

export default guild;
