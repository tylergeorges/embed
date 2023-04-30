import { Category, Channel, GuildQuery } from '@graphql/graphql';
import { Action, action } from 'easy-peasy';

export interface UIStore {
  /** The Y coordinate of the current channel selected */
  currentChannelYPos: number;

  isMembersListOpen: boolean;

  isChannelsListOpen: boolean;

  /** Category we are rendering channels for. */
  /** All the categories for the guild. */
  guildCategories: Category[] | undefined;

  guildChannels: Channel[] | undefined;
  /** Data for the current guild. */
  guildData: (GuildQuery & { guildID: string; channelID: string }) | undefined;
  currentChannel: Channel | undefined;

  // Actions
  setIsChannelsListOpen: Action<UIStore, boolean>;
  setIsMembersListOpen: Action<UIStore, boolean>;
  setGuildData: Action<UIStore, GuildQuery & { guildID: string; channelID: string }>;
  // Pass object for initial render on route
  // Else we just pass a regular channel object
  setCurrentChannel: Action<UIStore, Channel>;
  setCurrentChannelYPos: Action<UIStore, number>;
}

const ui: UIStore = {
  // State
  currentChannelYPos: 0,

  guildData: undefined,
  guildCategories: undefined,
  guildChannels: undefined,

  currentChannel: undefined,

  isChannelsListOpen: true,
  isMembersListOpen: false,

  // Actions
  // Toggle members channels list visibility
  setIsChannelsListOpen: action((state, payload) => {
    state.isChannelsListOpen = payload;
  }),

  // Toggle members list visibility
  setIsMembersListOpen: action((state, payload) => {
    state.isMembersListOpen = payload;
  }),

  setGuildData: action((state, payload) => {
    state.guildData = payload;

    // Get all the categories for the guild
    state.guildCategories = [
      ...new Map(payload.guild.channels.map(c => [c.category?.id, c.category])).values()
    ].filter(c => c) as Category[];

    // Get all channels for the guild
    state.guildChannels = payload.guild.channels;

    // Find the current channel from the channelID passed in
    const currentChannel = state.guildChannels.find(c => c.id === payload.channelID);
    state.currentChannel = currentChannel;
  }),

  setCurrentChannel: action((state, payload) => {
    state.currentChannel = payload;
  }),

  // Set the current channel's Y position, this is used for the
  // ActiveBackground component
  setCurrentChannelYPos: action((state, payload) => {
    state.currentChannelYPos = payload;
  })
};

export default ui;
