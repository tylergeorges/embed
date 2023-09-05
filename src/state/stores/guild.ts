/* eslint-disable prefer-object-spread */
import { Action, Computed, action, computed } from 'easy-peasy';
import { Category, Channel, GuildQuery, GuildSettings } from '@graphql/graphql';
import { positionChannel } from '@util/positionChannel';
import { APIMessage } from 'discord-api-types/v10';

export type GuildData = GuildQuery['guild'];

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
  data?: GuildData;
  settings?: GuildSettings;
  channels?: Channel[];
  categories?: Category[];
  currentThread: Channel | undefined;
  currentChannel: { name: string; topic: string } | undefined;
  pinnedMessages: APIMessage[];

  setData: Action<GuildStore, GuildData>;
  setSettings: Action<GuildStore, GuildSettings>;
  setChannels: Action<GuildStore, Channel[]>;
  setCurrentThread: Action<GuildStore, Channel>;
  setPinnedMessages: Action<GuildStore, APIMessage[]>;
  setCurrentChannel: Action<GuildStore, string>;
}

const guild: GuildStore = {
  // State
  data: undefined,
  settings: undefined,
  channels: undefined,
  currentThread: undefined,
  pinnedMessages: [],
  currentChannel: undefined,

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
      Object.assign({}, guildChannels[String(channel.id)]?.threads, channel?.threads);
    }

    return guildChannels;
  }),

  // Computed
  categories: undefined,

  // Actions
  setData: action((state, payload) => {
    state.data = payload;
  }),

  setSettings: action((state, payload) => {
    state.settings = payload;
  }),

  setPinnedMessages: action((state, payload) => {
    state.pinnedMessages = payload;
  }),

  setChannels: action((state, payload) => {
    const sortedChannels = [...payload].sort((a, b) => positionChannel(a) - positionChannel(b));
    // const sortedChannels = payload.sort((a, b) => positionChannel(a) - positionChannel(b));

    state.categories = [
      ...new Map(sortedChannels.map(c => [c.category?.id, c.category])).values()
    ] as Category[];

    state.channels = sortedChannels;
  }),

  setCurrentThread: action((state, payload) => {
    state.currentThread = payload;
  }),

  setCurrentChannel: action((state, payload) => {
    const currentChannel = state.guildChannels[payload] as Channel & { topic?: string };

    if (currentChannel)
      state.currentChannel = { name: currentChannel.name, topic: currentChannel.topic ?? '' };
  })
};

export default guild;
