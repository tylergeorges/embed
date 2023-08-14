/* eslint-disable no-continue */
import { Action, Computed, action, computed } from 'easy-peasy';
import { Category, Channel, Guild, GuildSettings, Mention, Role } from '@graphql/graphql';
import { positionChannel } from '@util/positionChannel';
import { APIChannel } from 'discord-api-types/v10';

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
  [channelId: string]: Channel | APIChannel;
};

type GuildMembers = {
  [memberId: string]: Mention & { username: string };
};

export interface GuildStore {
  guildChannels: Computed<GuildStore, GuildChannels>;
  data?: Guild;
  settings?: GuildSettings;
  channels?: Channel[];
  categories: Computed<GuildStore, Category[]>;
  currentThread: Channel | undefined;
  currentChannel: { name: string; topic?: string | null } | undefined;
  refetchGuild: boolean;
  members?: GuildMembers;
  roles?: Map<string, Role>;

  setData: Action<GuildStore, Guild>;
  setSettings: Action<GuildStore, GuildSettings>;
  setChannels: Action<GuildStore, Channel[]>;
  setCurrentThread: Action<GuildStore, Channel>;
  setCurrentChannel: Action<GuildStore, string>;
  setRefetchGuild: Action<GuildStore, boolean>;

  addMember: Action<GuildStore, Mention>;
}

const addChannelToMap = (channels: Channel[], guildChannels: GuildChannels) => {
  for (const channel of channels) {
    const mapHasChannel = guildChannels[String(channel.id)];

    if (mapHasChannel) continue;

    guildChannels[String(channel.id)] = channel;

    const channelThreads = channel.threads;

    if (!channelThreads?.length) continue;

    // Recusrively add threads to channels map
    addChannelToMap(channelThreads, guildChannels);
  }

  return guildChannels;
};

const guild: GuildStore = {
  // State
  data: undefined,
  settings: undefined,
  channels: undefined,
  currentThread: undefined,
  currentChannel: undefined,
  refetchGuild: false,
  members: undefined,
  roles: undefined,

  guildChannels: computed(state => {
    if (!state.channels) return {};

    const guildChannels: GuildChannels = {};

    return addChannelToMap(state.channels, guildChannels);
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

    if (!state.roles) {
      state.roles = new Map(payload.roles.map(obj => [obj.id, obj]));
    }
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

  addMember: action((state, payload) => {
    if (!state.members) {
      state.members = {};
    }

    if (!state.members[payload.id]) {
      state.members[payload.id] = {
        ...payload,
        username: payload.name
      };
    }
  }),

  setCurrentThread: action((state, payload) => {
    state.currentThread = payload;
  }),

  setCurrentChannel: action((state, payload) => {
    const currentChannel = state.guildChannels[payload];

    if (currentChannel && 'topic' in currentChannel) {
      state.currentChannel = {
        name: currentChannel.name as string,
        topic: currentChannel.topic as string
      };
    }
  })
};

export default guild;
