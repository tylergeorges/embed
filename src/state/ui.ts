import { Category } from '@graphql/graphql';
import { UiState } from '@state/types';
import { action } from 'easy-peasy';

const ui: UiState.Store = {
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
