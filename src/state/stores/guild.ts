import { Action, Computed, action, computed } from 'easy-peasy';
import { Category, Channel, GuildSettings, Mention } from '@graphql/graphql';
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
  data?: IGuild;
  settings?: GuildSettings;
  channels?: Channel[];
  categories: Computed<GuildStore, Category[]>;
  currentThread: Channel | undefined;
  currentChannel: { name: string; topic?: string | null } | undefined;
  refetchGuild: boolean;
  members?: GuildMembers;

  setData: Action<GuildStore, IGuild>;
  setSettings: Action<GuildStore, GuildSettings>;
  setChannels: Action<GuildStore, Channel[]>;
  setCurrentThread: Action<GuildStore, Channel>;
  setCurrentChannel: Action<GuildStore, string>;
  setRefetchGuild: Action<GuildStore, boolean>;

  addMember: Action<GuildStore, Mention>;
}

const guild: GuildStore = {
  // State
  data: undefined,
  settings: undefined,
  channels: undefined,
  currentThread: undefined,
  currentChannel: undefined,
  refetchGuild: false,
  members: undefined,

  guildChannels: computed(state => {
    if (!state.channels) return {};

    const guildChannels: GuildChannels = {};

    // Filter for channels that have threads
    const channelsLen = state.channels.length;

    // Iterate over channels that have threads and add them to map
    for (let i = 0; i < channelsLen; i += 1) {
      const channel = state.channels[i] as Channel;

      const mapHasChannel = guildChannels[String(channel.id)];
      if (mapHasChannel) break;

      guildChannels[String(channel.id)] = channel;
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

    if ('topic' in currentChannel) {
      state.currentChannel = {
        name: currentChannel.name as string,
        topic: currentChannel.topic as string
      };
    }
  })
};

export default guild;
