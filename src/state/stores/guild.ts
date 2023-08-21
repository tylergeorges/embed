/* eslint-disable no-continue */
import { Action, Computed, action, computed } from 'easy-peasy';
import { Category, Channel, Guild, GuildSettings, Role } from '@graphql/graphql';
import { positionChannel } from '@util/positionChannel';
import { TAPIChannel, TChannel, GuildChannels } from 'types/guild.types';

export interface GuildStore {
  guildChannels: Computed<GuildStore, GuildChannels>;
  data?: Guild;
  settings?: GuildSettings;
  channels?: TChannel[];
  categories: Computed<GuildStore, Category[]>;
  currentThread: Channel | undefined;
  currentChannel: { name: string; topic: string; canSend: boolean } | undefined;
  refetchGuild: boolean;
  roles?: Map<string, Role>;

  setData: Action<GuildStore, Guild>;
  setSettings: Action<GuildStore, GuildSettings>;
  setChannels: Action<GuildStore, TChannel[]>;
  setCurrentThread: Action<GuildStore, TChannel>;
  setCurrentChannel: Action<GuildStore, string>;
  setRefetchGuild: Action<GuildStore, boolean>;
}

const addChannelToMap = (channels: TChannel[], guildChannels: GuildChannels) => {
  for (const channel of channels) {
    const mapHasChannel = guildChannels[String(channel.id)];

    if (mapHasChannel) continue;

    guildChannels[String(channel.id)] = channel;

    const channelThreads = channel.threads as TChannel[];

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
    if (payload !== state.refetchGuild) {
      state.refetchGuild = payload;
    }
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
    const currentChannel = state.guildChannels[payload] as TAPIChannel;

    if (currentChannel && 'topic' in currentChannel && 'canSend' in currentChannel) {
      state.currentChannel = {
        name: currentChannel.name,

        topic: currentChannel.topic ?? '',

        canSend: currentChannel.canSend
      };
    }
  })
};

export default guild;
