import { Action, action } from 'easy-peasy';

export interface UIStore {
  // State
  currentChannelYPos: number;
  isMembersListOpen: boolean;
  isChannelsListOpen: boolean;

  // Actions
  setIsChannelsListOpen: Action<UIStore, boolean>;
  setIsMembersListOpen: Action<UIStore, boolean>;
  setCurrentChannelYPos: Action<UIStore, number>;
}

const ui: UIStore = {
  // State
  isChannelsListOpen: true,
  isMembersListOpen: false,

  currentChannelYPos: 0,

  // Actions
  setIsChannelsListOpen: action((state, payload) => {
    state.isChannelsListOpen = payload;
  }),

  setIsMembersListOpen: action((state, payload) => {
    state.isMembersListOpen = payload;
  }),

  // Set the current channel's Y position, this is used for the
  // ActiveBackground component
  setCurrentChannelYPos: action((state, payload) => {
    state.currentChannelYPos = payload;
  })
};

export default ui;
