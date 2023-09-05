/* eslint-disable no-continue */
/* eslint-disable prefer-object-spread */
import { Action, Computed, action, computed } from 'easy-peasy';
import {
  Category,
  Channel,
  Guild,
  GuildSettings,
  Role,
  TextChannel,
  ThreadChannel
} from '@graphql/graphql';
import { positionChannel } from '@util/positionChannel';
import { APIChannel } from 'discord-api-types/v10';

export interface IThread extends Channel {
  id: string;
  name: string;
  __typename: 'ThreadChannel';
}

export type GuildChannels = {
  [channelId: string]: Channel | (APIChannel & { threads?: Channel[] });
};

export interface GuildStore {
  guildChannels: Computed<GuildStore, GuildChannels>;
  data?: Guild;
  settings?: GuildSettings;
  channels?: Channel[];
  categories?: Category[];
  currentThread: ThreadChannel | undefined;
  currentChannel: { name: string; topic: string; canSend: boolean } | undefined;
  refetchGuild: boolean;
  roles?: Map<string, Role>;

  setData: Action<GuildStore, Guild>;
  setSettings: Action<GuildStore, GuildSettings>;
  setChannels: Action<GuildStore, Channel[]>;
  setCurrentThread: Action<GuildStore, ThreadChannel>;
  setCurrentChannel: Action<GuildStore, string>;
  setRefetchGuild: Action<GuildStore, boolean>;
}

const addChannelToMap = (channels: Channel[], guildChannels: GuildChannels) => {
  for (const channel of channels) {
    const mapHasChannel = guildChannels[String(channel.id)];

    if (mapHasChannel) continue;

    guildChannels[String(channel.id)] = channel;

    const channelThreads = channel.threads as ThreadChannel[];

    if (!channelThreads?.length) continue;

    // Recusrively add threads to channels map
    addChannelToMap(channelThreads, guildChannels);
  }

  return guildChannels;
};

const guild: GuildStore = {
  // State
  categories: undefined,
  data: undefined,
  settings: undefined,
  channels: undefined,
  currentThread: undefined,
  currentChannel: undefined,
  refetchGuild: false,
  roles: undefined,

  // Computed
  guildChannels: computed(state => {
    if (!state.channels) return {};

    const guildChannels: GuildChannels = {};

    return addChannelToMap(state.channels, guildChannels);
  }),

  // Actions
  setData: action((state, payload) => {
    state.data = payload;

    if (!state.roles) {
      state.roles = new Map(payload.roles.map(obj => [obj.id, obj]));
    }
  }),

  setSettings: action((state, payload) => {
    state.settings = payload;
  }),

  setRefetchGuild: action((state, payload) => {
    if (payload !== state.refetchGuild) {
      state.refetchGuild = payload;
    }
  }),

  setChannels: action((state, payload) => {
    const sortedChannels = [...payload].sort((a, b) => positionChannel(a) - positionChannel(b));

    state.categories = [
      ...new Map(sortedChannels.map(c => [c.category?.id, c.category])).values()
    ] as Category[];

    state.channels = sortedChannels;
  }),

  setCurrentThread: action((state, payload) => {
    state.currentThread = payload;
  }),

  setCurrentChannel: action((state, payload) => {
    const currentChannel = state.guildChannels[payload] as TextChannel;

    if (currentChannel)
      state.currentChannel = {
        name: currentChannel.name,

        topic: currentChannel.topic ?? '',

        canSend: currentChannel.canSend
      };
  })
};

export default guild;
