/* eslint-disable no-continue */
/* eslint-disable prefer-object-spread */
import { Action, Computed, action, computed } from 'easy-peasy';
import { Category, Channel, Guild, GuildSettings, Role } from '@graphql/graphql';
import { positionChannel } from '@util/positionChannel';
import { APIDiscordChannel, GqlChannel, GuildChannels } from 'types/guild.types';

export interface GuildStore {
  guildChannels: Computed<GuildStore, GuildChannels>;
  data?: Guild;
  settings?: GuildSettings;
  channels?: GqlChannel[];
  categories?: Category[];
  currentThread: Channel | undefined;
  currentChannel: { name: string; topic: string; canSend: boolean } | undefined;
  refetchGuild: boolean;
  roles?: Map<string, Role>;

  setData: Action<GuildStore, Guild>;
  setSettings: Action<GuildStore, GuildSettings>;
  setChannels: Action<GuildStore, GqlChannel[]>;
  setCurrentThread: Action<GuildStore, GqlChannel>;
  setCurrentChannel: Action<GuildStore, string>;
  setRefetchGuild: Action<GuildStore, boolean>;
}

const addChannelToMap = (channels: GqlChannel[], guildChannels: GuildChannels) => {
  for (const channel of channels) {
    const mapHasChannel = guildChannels[String(channel.id)];

    if (mapHasChannel) continue;

    guildChannels[String(channel.id)] = channel;

    const channelThreads = channel.threads as GqlChannel[];

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
    const currentChannel = state.guildChannels[payload] as APIDiscordChannel;

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
